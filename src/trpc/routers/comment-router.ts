import { z } from "zod";
import { publicProcedure, router, protectedProcedure } from "../trpc";
import { db } from "@/lib/db";

export const commentRouter = router({
  // list all comments
  listAll: publicProcedure
    .query(() => {
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
  // delete a comment by id only the admin and the blog owner can delete the comment
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, role } = ctx!.user;

      // Find the comment by ID
      const comment = await db.comment.findUnique({
        where: {
          id: input.id,
        },
        select: {
          post: {
            select: {
              authorId: true,
            }
          }
        }
      });

      if (!comment) {
        throw new Error("Comment not found");
      }

      // Check if the current user is the owner of the post or is an admin
      if (role !== "ADMIN" && comment.post.authorId !== id) {
        throw new Error(
          "Unauthorized: You are not the owner of this blog or an admin to delete this"
        );
      }

      // Delete the comment
      await db.comment.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
});
