// src/main.ts

import Fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter } from './router'          // tRPCのルーターまとめたやつ
import { createTRPCContext } from './context' // 認証とか共通情報作る関数

async function main() {
  const fastify = Fastify()

  // tRPCのルーターをFastifyに登録✨
  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',         // APIのルートパス
    trpcOptions: {
      router: appRouter,
      createContext: createTRPCContext,
    },
  })

  // サーバ起動！
  await fastify.listen({ port: 3000 })
  console.log('🚀 サーバ起動！ http://localhost:3000/trpc')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
