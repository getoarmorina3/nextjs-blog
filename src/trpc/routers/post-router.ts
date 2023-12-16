import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import slugify from "slugify";
import { db } from "@/lib/db";

export const postRouter = router({
  // list all posts in descending order including the author
  listAll: publicProcedure.query(() => {
    return db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
  }),
  // include the author and only return the posts of the current user
  myBlogs: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.user!.id;

    return db.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
  }),
  // only the authenticated users can create a post
  create: protectedProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(3, {
            message: "Title must be at least 3 characters long",
          })
          .max(72, {
            message: "Title must be less than 72 characters long",
          }),
        content: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content } = input;
      const slug = slugify(title, { lower: true });

      const payload = await db.post.create({
        data: {
          title,
          content,
          slug,
          authorId: ctx.user!.id,
        },
      });

      return payload;
    }),
  // view a single post by slug
  view: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query((opts) => {
      return db.post.findUnique({
        where: {
          slug: opts.input.slug,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
    }),
  // delete a post by slug only the owner or the admin can delete
  delete: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, role } = ctx!.user;

      // Find the post by ID
      const post = await db.post.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          authorId: true,
        },
      });

      if (!post) {
        throw new Error("Blog not found");
      }

      // Check if the current user is the owner of the post or is an admin
      if (role !== "ADMIN" && post.authorId !== id) {
        throw new Error(
          "Unauthorized: You are not the owner of this blog or an admin to delete this"
        );
      }

      // Delete the post
      await db.post.delete({
        where: {
          slug: input.slug,
        },
      });

      return true;
    }),
});
