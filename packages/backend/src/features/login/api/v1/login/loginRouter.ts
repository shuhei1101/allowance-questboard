import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const loginRouter = t.router({
  login: t.procedure
    .input((val: unknown) => {
      if (
        typeof val === 'object' &&
        val !== null &&
        'userId' in val &&
        typeof (val as any).userId === 'string'
      ) {
        return val as { userId: string }
      }
      throw new Error('Invalid input: userId is required and must be a string')
    })
    .mutation(({ input }) => {
      const { userId } = input

      return {
        message: `ようこそ、ユーザーID ${userId} さん🥳✨`,
        loggedIn: true,
      }
    }),
})
