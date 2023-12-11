import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import slugify from "slugify";
import { db } from "@/lib/db";

export const postRouter = router({
  list: publicProcedure.query(() => {
    return db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
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
      });
    }),
});
