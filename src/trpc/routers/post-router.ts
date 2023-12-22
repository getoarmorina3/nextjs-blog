import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import slugify from "slugify";
import { db } from "@/lib/db";

export const postRouter = router({
  // list all posts in descending order including the author
  listAll: publicProcedure
    // .input(
    //   z.object({
    //     take: z.number(),
    //     skip: z.number(),
    //   })
    // )
    .query(({ input }) => {
      return db.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          category: true,
        },
        // take: input.take,
        // skip: input.skip,
      });
    }),
  mostPopular: publicProcedure.query(() => {
    return db.post.findMany({
      take: 2,
      orderBy: {
        visitCount: "desc",
      },
      include: {
        author: true,
        category: true,
      },
    });
  }),
  // include the author and only return the posts of a specific user
  getUserBlogs: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      const userId = input.id;

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
        categoryId: z.string().cuid({ message: "Category is required"}),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, categoryId } = input;
      const slug = slugify(title, { lower: true });

      if (!categoryId) {
        throw new Error("Category ID is required");
      }

      const payload = await db.post.create({
        data: {
          title,
          content,
          slug,
          authorId: ctx.user!.id,
          categoryId,
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
    .query(async (opts) => {
      // Find the post based on the provided slug
      const post = await db.post.findUnique({
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
          Comment: true
        },
      });

      // Increment the visit count
      if (post) {
        await db.post.update({
          where: {
            slug: opts.input.slug,
          },
          data: {
            visitCount: {
              increment: 1,
            },
          },
        });
      }

      // Return the post with the updated visit count
      return post;
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
