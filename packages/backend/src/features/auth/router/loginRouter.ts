import { TRPCError } from '@trpc/server';
import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { loginQuery, LoginQueryResult } from '@backend/features/auth/query_service/loginQuery';

/**
 * ログインレスポンス
 */
export class LoginResponse {
  constructor(
    public readonly userId: string,
    public readonlyfamilyMemberId: number,
    public readonlyfamilyId: number,
    public readonlyparentId?: number | null,
    public readonlychildId?: number | null
  ) {}

  /**
   * クエリ結果からレスポンスオブジェクトを生成
   * 
   * @param queryResult - ログインクエリの結果
   * @returns LoginResponse インスタンス
   */
  public static fromQueryResult(queryResult: LoginQueryResult): LoginResponse {
    return new LoginResponse(
      queryResult.userId,
      queryResult.familyMemberId,
      queryResult.familyId,
      queryResult.parentId,
      queryResult.childId
    );
  }
}

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
    .query(async ({ ctx }) => {
      try {
        const queryResult = await loginQuery({ 
          session: ctx.session,
          userId: ctx.userId
        });
        
        return LoginResponse.fromQueryResult(queryResult);
        
      } catch (error) {
        if (error instanceof Error && error.message.includes('が見つかりません')) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: error.message,
          });
        }
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'ログイン処理中にエラーが発生しました',
        });
      }
    }),
});
