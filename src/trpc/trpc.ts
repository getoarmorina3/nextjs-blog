import { getAuthSession } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
    const { user } = (await getAuthSession()) || {};

    if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return opts.next({
        ...opts,
        ctx: {
            ...opts.ctx,
            user,
        },
    });
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuth)