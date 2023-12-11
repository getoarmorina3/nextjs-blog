import { publicProcedure, router } from './trpc';
import z from 'zod';
import { postRouter } from './post-router';
import { commentRouter } from './comment-router';
import { userRouter } from './user-router';

export const appRouter = router({
  post: postRouter,
  comment: commentRouter,
  user: userRouter,
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().optional()
      }),
    )
    .query((opts) => {
      const name = opts.input.name;

      return {
        greeting: `Hello ${name}`
      }
    }),
})

export type AppRouter = typeof appRouter