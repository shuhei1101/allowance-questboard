import { TRPCError } from '@trpc/server';
import { t } from '@backend/core/trpc/trpcContext';
import { getMasterData } from '../usecase/getMasterData';

/**
 * マスタデータに関するtRPCルーター
 */
export const initRouter = t.router({
  /**
   * マスタデータ取得エンドポイント
   * 言語Enumと家族メンバータイプEnumのZodスキーマを返す
   */
  getMasterData: t.procedure
    .query(async () => {
      try {
        return await getMasterData();
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'マスタデータ取得中にエラーが発生しました',
        });
      }
    }),
});
