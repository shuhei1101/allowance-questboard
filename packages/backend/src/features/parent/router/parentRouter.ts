import { t, authenticatedProcedure } from '@backend/core/trpc/trpcContext';
import { parentQuery } from '../query/parentQuery';
import z from 'zod';
import { LocalizedTRPCError } from '@backend/core/errors/localizedTRPCError';
import { LocaleString } from '@backend/core/messages/localeString';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';

export const parentResponseSchema = z.object({
  parentId: z.number(),
  familyMemberId: z.number(),
  name: z.string(),
  iconId: z.number().optional(),
  birthday: z.string(),
});

/**
 * 親ルーター
 */
export const parentRouter = t.router({
  /**
   * 親情報取得処理
   * 
   * JWTトークンを使用した認証付きで親情報を取得します。
   */
  getParent: authenticatedProcedure
    .input(z.object({
      parentId: z.number()
    }))
    .output(parentResponseSchema)
    .query(async ({ ctx, input }) => {
      try {
        const queryResult = await parentQuery({ 
          session: ctx.session,
          parentId: input.parentId
        });
        
        return parentResponseSchema.parse({
          parentId: queryResult.parentId,
          familyMemberId: queryResult.familyMemberId,
          name: queryResult.name,
          iconId: queryResult.iconId,
          birthday: queryResult.birthday,
        });
        
      } catch (error) {
        if (error instanceof Error && error.message.includes('が見つかりません')) {
          throw new LocalizedTRPCError({
            code: 'NOT_FOUND',
            errorType: 'PARENT_NOT_FOUND',
            localeMessage: new LocaleString({
              ja: '親情報が見つかりません',
              en: 'Parent not found',
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

export type ParentResponse = z.infer<typeof parentResponseSchema>;
export interface ParentRouter {
  query(input: { parentId: number }): Promise<ParentResponse>;
}
