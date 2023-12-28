import { router, publicProcedure, protectedProcedure } from "../trpc";
import z from "zod";
import { db } from "@/lib/db";

export const userRouter = router({
  listAll: publicProcedure.query(() => {
    return db.user.findMany({
      include: {
        posts: true,
      },
    });
  }),
  updateUsername: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(32),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = ctx.user?.id;
      const payload = await db.user.update({
        where: {
          id,
        },
        data: {
          name: input.name,
        },
      });
      return payload;
    }),
  // delete a user by id only the admin can delete
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Find the post by ID
      const user = await db.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if the current user is an admin
      if (ctx.user.role !== "ADMIN") {
        throw new Error(
          "Unauthorized: You are not an admin to delete this"
        );
      }

      // Check if the user is an admin
      if (user.role === "ADMIN") {
        throw new Error(
          "Unauthorized: You cannot delete an admin"
        );
      }

      // Delete the user
      await db.user.delete({
        where: {
          id: input.id,
        },
      });

      return true;
    }),
});
