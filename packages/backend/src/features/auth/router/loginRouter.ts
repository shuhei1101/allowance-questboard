import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { loginQuery } from '../query/loginQuery';
import z from 'zod';
import { LocalizedTRPCError } from '@backend/core/errors/localizedTRPCError';
import { LocaleString } from '@backend/core/messages/localeString';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { UserIdSchema } from '../value-object/userId';
import { FamilyNameSchema } from '../../family/value-object/familyName';
import { BaseIdSchema } from '../../../core/value-object/base_id';

export const loginOutput = z.object({
  userId: UserIdSchema,
  familyMemberId: BaseIdSchema.optional(),
  familyId: BaseIdSchema.optional(),
  familyName: FamilyNameSchema.optional(),
  parentId: BaseIdSchema.optional(),
  childId: BaseIdSchema.optional(),
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
    .output(loginOutput)
    .query(async ({ ctx }) => {
      try {
        const queryResult = await loginQuery({ 
          session: ctx.session,
          userId: ctx.userId
        });
        
        return loginOutput.parse({
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

export type LoginResponse = z.infer<typeof loginOutput>;
export interface LoginHandler {
  query(): Promise<LoginResponse>;
}
