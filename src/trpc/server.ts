import 'server-only'

import { appRouter } from '.'

export const serverTrpc = appRouter.createCaller({
    eventServer: { trigger: async () => { } },
    session: { user: null }
})