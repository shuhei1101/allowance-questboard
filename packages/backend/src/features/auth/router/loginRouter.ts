import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { loginQuery } from '../query/loginQuery';
import z from 'zod';
import { LocalizedTRPCError } from '@backend/core/errors/localizedTRPCError';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { FamilyNameSchema } from '../../family/value-object/familyName';
import { BaseIdSchema } from '../../../core/value-object/base_id';

export const loginOutput = z.object({
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
          familyMemberId: queryResult.familyMemberId,
          familyId: queryResult.familyId,
          familyName: queryResult.familyName,
          parentId: queryResult.parentId,
          childId: queryResult.childId,
        });
        
      } catch (error) {
        console.error('loginRouter.loginでエラー:', error);
        if (error instanceof Error && error.message.includes('が見つかりません')) {
          return loginOutput.parse({
            familyMemberId: undefined,
            familyId: undefined,
            familyName: undefined,
            parentId: undefined,
            childId: undefined,
          });
        }
        console.error('loginRouter.loginで予期せぬエラー:', error);
        throw new LocalizedTRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          errorType: 'INTERNAL_ERROR',
          localeMessage: AuthErrorMessages.internalError(),
        })
      }
    }),
});

export type LoginResponse = z.infer<typeof loginOutput>;
export interface LoginRouter {
  query(): Promise<LoginResponse>;
}
