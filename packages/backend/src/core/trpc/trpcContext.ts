import { initTRPC, TRPCError } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import jwt from 'jsonwebtoken';
import { EntityManager } from 'typeorm';
import { AppDataSource } from '../config/dataSource';

/**
 * tRPCのコンテキスト
 */
export interface Context {
  userId?: string;
  languageId: number;
  session: EntityManager;
}

/**
 * Fastify contextを作成
 */
export const createContext = async ({ req }: CreateFastifyContextOptions): Promise<Context> => {
  // EntityManagerを取得
  const session = AppDataSource.manager;

  // LanguageIdヘッダーから言語IDを取得（デフォルトは1：日本語）
  const languageId = parseInt(req.headers['languageid'] as string) || 1;

  // Authorizationヘッダーからトークンを取得
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return { session, languageId };
  }

  const token = authorization.replace('Bearer ', '');
  
  try {
    if (!process.env.SUPABASE_JWT_SECRET) {
      throw new Error("SUPABASE_JWT_SECRET is not defined");
}

    // JWTトークンをデコード
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET) as any;
    const userId = decoded.sub || decoded.userId;
    
    return {
      userId,
      languageId,
      session
    };
  } catch (error) {
    return { session, languageId };
  }
};

/**
 * tRPCインスタンス
 */
export const t = initTRPC.context<Context>().create();

/**
 * 認証が必要なプロシージャ
 */
export const authenticatedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Bearerトークンが必要です',
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId, // 型安全性のため
    },
  });
});

/**
 * 認証が不要なプロシージャ
 */
export const publicProcedure = t.procedure;
