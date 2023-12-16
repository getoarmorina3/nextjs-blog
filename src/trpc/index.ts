import { publicProcedure, router } from './trpc';
import z from 'zod';
import { postRouter } from './routers/post-router';
import { commentRouter } from './routers/comment-router';
import { userRouter } from './routers/user-router';

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