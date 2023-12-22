import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { db } from "@/lib/db";
import slugify from "slugify";

export const categoryRouter = router({
  // list all posts in descending order
  listAll: publicProcedure.query(() => {
    return db.category.findMany({
      include:{
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
});
