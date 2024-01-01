import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import slugify from "slugify";
import { db } from "@/lib/db";

export const postRouter = router({
  // list all posts in descending order including the author
  listAll: publicProcedure.query(({ input }) => {
    return db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        category: true,
      },
    });
  }),
  fetchPostsPages: publicProcedure
    .input(
      z.object({
        query: z.string(),
        category: z.string().optional(),
        itemsPerPage: z.number().default(12),
      })
    )
    .query(async ({ input }) => {
      const { query, category, itemsPerPage } = input;

      try {
        const count = await db.post.count({
          where: {
            category: {
              slug: category,
            },
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { author: { name: { contains: query, mode: "insensitive" } } },
            ],
          },
        });

        const totalPages = Math.ceil(count / itemsPerPage);
        return totalPages;
      } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch the total number of posts.`);
      }
    }),
  fetchFilteredPosts: publicProcedure
    .input(
      z.object({
        query: z.string(),
        currentPage: z.number(),
        category: z.string().optional(),
        itemsPerPage: z.number().default(12),
      })
    )
    .query(async ({ input }) => {
      const { query, currentPage, category, itemsPerPage } = input;
      const skip = (currentPage - 1) * itemsPerPage;

      try {
        const posts = await db.post.findMany({
          where: {
            category: {
              slug: category,
            },
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { author: { name: { contains: query, mode: "insensitive" } } },
            ],
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          include: {
            author: true,
            category: true,
          },
          take: itemsPerPage,
          skip,
        });

        return posts;
      } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch posts.");
      }
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
          Comment: true,
        },
      });
    }),
  // only the authenticated users can create a post
  create: protectedProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(10, {
            message: "Title must be at least 10 characters long",
          })
          .max(100, {
            message: "Title must be less than 100 characters long",
          }),
        content: z.any(),
        categoryId: z.string().cuid({ message: "Category is required" }),
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
          Comment: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
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
  // Only blog owners can edit a post
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(10, { message: "Title must be at least 10 characters long" })
          .max(100, { message: "Title must be less than 100 characters long" }),
        content: z.any(),
        categoryId: z.string().cuid({ message: "Category is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, categoryId } = input;
      const slug = slugify(title, { lower: true });

      const payload = await db.post.update({
        where: {
          id: input.id,
        },
        data: {
          title,
          content,
          slug,
          categoryId,
        },
      });

      return payload;
    }),
});
