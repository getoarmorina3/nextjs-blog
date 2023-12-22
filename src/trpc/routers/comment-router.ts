import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/lib/db";

export const commentRouter = router({
  // list all comments
  listAll: publicProcedure.query(() => {
    return db.comment.findMany({
      include: {
        post: true,
      },
    });
  }),
  // view all comments for a specific post
  viewAll: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(({ input }) => {
      const postId = input.postId;

      return db.comment.findMany({
        where: {
          postId,
        },
      });
    }),
  // every user can create a comment
  create: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        name: z
          .string()
          .min(3, { message: "Name must be at least 3 characters long" })
          .max(32, { message: "Name must not exceed 32 characters" }),
        email: z.string().optional(),
        text: z
          .string()
          .min(3, { message: "Comment must be at least 3 characters long" })
          .max(255, { message: "Comment must not exceed 255 characters" }),
      })
    )
    .mutation(async ({ input }) => {
      const { postId, name, email, text } = input;

      const payload = await db.comment.create({
        data: {
          postId,
          name,
          email,
          text,
        },
      });
      return payload;
    }),
});
