// src/main.ts

import Fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter } from './router'          // tRPCのルーターまとめたやつ
import { createContext } from './core/trpc/trpcContext' // 認証とか共通情報作る関数
import { AppDataSource } from './core/config/dataSource' // TypeORM DataSource
import { setRedisClient } from './core/cache/redisCache' // Redis キャッシュ管理
import { redisClient } from './core/config/redisConfig'   // Redis クライアント

async function main() {
  // Redis クライアントを初期化（アプリケーション起動時に一度だけ）
  try {
    setRedisClient(redisClient);
    console.log('✨ Redisクライアント初期化完了！');
  } catch (error) {
    console.log('⚠️ Redis初期化失敗（開発中はOK）:', (error as Error).message);
  }

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
