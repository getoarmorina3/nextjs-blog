import { publicProcedure, router } from './trpc';
import z from 'zod';

export const appRouter = router({
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
    })
})

export type AppRouter = typeof appRouter