// src/main.ts

import Fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter } from './router'          // tRPCのルーターまとめたやつ
import { createContext } from './core/trpc/trpcContext' // 認証とか共通情報作る関数
import { AppDataSource } from './core/config/dataSource' // TypeORM DataSource
import { setRedisClient } from './core/cache/redisCache' // Redis キャッシュ管理
import { redisClient } from './core/config/redisConfig'   // Redis クライアント
import { initMasterData } from './features/auth/usecase/initMasterData' // マスタデータ初期化
import { LanguageDao } from './features/language/dao/languageDao' // 言語DAO
import { FamilyMemberTypeDao } from './features/family-member/dao/familyMemberTypeDao' // 家族メンバータイプDAO
import { LanguageRepository } from './features/language/repository/languageRepository'
import { FamilyMemberTypeRepository } from './features/family-member/repository/familyMemberTypeRepository'
import { IconCategoryRepository } from './features/icon-category/repository/iconCategoryRepository'
import { IconCategoryDao } from './features/icon-category/dao/iconCategoryDao'

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
    
    // マスタデータ初期化
    try {
      const entityManager = AppDataSource.manager;
      await initMasterData({
        languageRepository: new LanguageRepository({ 
          languageDao: new LanguageDao(entityManager)
        }),
        familyMemberTypeRepository: new FamilyMemberTypeRepository({
          familyMemberTypeDao: new FamilyMemberTypeDao(entityManager)
        }),
        iconCategoryRepository: new IconCategoryRepository({
          iconCategoryDao: new IconCategoryDao(entityManager)
        })
      });
      console.log('✨ マスタデータ初期化完了！');
    } catch (error) {
      console.log('⚠️ マスタデータ初期化失敗:', (error as Error).message);
    }
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
