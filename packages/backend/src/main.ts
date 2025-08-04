// src/main.ts

import Fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter } from './router'          // tRPCのルーターまとめたやつ
import { createContext } from './core/trpc/trpcContext' // 認証とか共通情報作る関数
import { AppDataSource } from './core/config/dataSource' // TypeORM DataSource

async function main() {
  try {
    await AppDataSource.initialize()
    console.log('🗄️ データベース接続完了！')
  } catch (error) {
    console.log('⚠️ データベース接続失敗（開発中はOK）:', (error as Error).message)
  }

  const fastify = Fastify()

  // tRPCのルーターをFastifyに登録✨
  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',         // APIのルートパス
    trpcOptions: {
      router: appRouter,
      createContext: createContext,
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
