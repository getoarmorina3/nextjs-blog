import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { db } from "@/lib/db";
import slugify from "slugify";

export const categoryRouter = router({
  // list all posts in descending order
  listAll: publicProcedure.query(() => {
    return db.category.findMany({
      include: {
        posts: true
      }
    });
  }),
  // only the admin can create a new category
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(32),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      const slug = slugify(name, { lower: true });

      if (ctx.user!.role === "ADMIN") {
        const payload = await db.category.create({
          data: {
            name,
            slug
          },
        });
        return payload;
      } else {
        throw new Error("You are not authorized to create a category");
      }
    }),
  // only the admin can update a category
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3).max(32),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;

      const slug = slugify(name, { lower: true });

      if (ctx.user!.role === "ADMIN") {
        const payload = await db.category.update({
          where: { id },
          data: {
            name,
            slug,
          },
        });
        return payload;
      } else {
        throw new Error("You are not authorized to update a category");
      }
    }),
  // get category name by id
  getCategoryName: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      return db.category.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  // view a single category by slug including all posts
  view: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query((opts) => {
      return db.category.findUnique({
        where: {
          slug: opts.input.slug,
        },
        include: {
          posts: {
            include: {
              author: true,
            },
          },
        },
      });
    }),
  // delete a category by id only the admin can delete
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, role } = ctx!.user;

      // Find the coryateg by ID
      const category = await db.category.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      // Check if the current user is an admin
      if (role !== "ADMIN") {
        throw new Error(
          "Unauthorized: You are not an admin to delete this"
        );
      }

      // Delete the category
      await db.category.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
});
