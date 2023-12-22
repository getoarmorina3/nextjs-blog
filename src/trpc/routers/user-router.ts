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
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
      return payload;
    }),
});
