import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { loginQuery } from '../query/loginQuery';
import z from 'zod';
import { LocalizedTRPCError } from '@backend/core/errors/localizedTRPCError';
import { LocaleString } from '@backend/core/messages/localeString';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';

export const loginResponseSchema = z.object({
  userId: z.string().optional(),
  familyMemberId: z.number().optional(),
  familyId: z.number().optional(),
  familyName: z.string().optional(),
  parentId: z.number().nullable().optional(),
  childId: z.number().nullable().optional(),
});

/**
 * ログインルーター
 */
export const loginRouter = t.router({
  /**
   * JWTトークンを使用したログイン処理
   * 
   * ヘッダーのBearerトークンからユーザーIDを取得し、
   * 認証情報を返します。
   */
  login: authenticatedProcedure
    .output(loginResponseSchema)
    .query(async ({ ctx }) => {
      try {
        const queryResult = await loginQuery({ 
          session: ctx.session,
          userId: ctx.userId
        });
        
        return loginResponseSchema.parse({
          userId: queryResult.userId,
          familyMemberId: queryResult.familyMemberId,
          familyId: queryResult.familyId,
          familyName: queryResult.familyName,
          parentId: queryResult.parentId,
          childId: queryResult.childId,
        });
        
      } catch (error) {
        if (error instanceof Error && error.message.includes('が見つかりません')) {
          throw new LocalizedTRPCError({
            code: 'NOT_FOUND',
            errorType: 'USER_NOT_FOUND',
            localeMessage: new LocaleString({
              ja: AuthErrorMessages.userNotFoundError().ja,
              en: AuthErrorMessages.userNotFoundError().en,
            }),
          });
        }
        
        throw new LocalizedTRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          errorType: 'INTERNAL_ERROR',
          localeMessage: new LocaleString({
            ja: AuthErrorMessages.internalError().ja,
            en: AuthErrorMessages.internalError().en,
          }),
        })
      }
    }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export interface LoginRouter {
  query(): Promise<LoginResponse>;
}
