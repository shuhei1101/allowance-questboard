import { TRPCError } from '@trpc/server';
import { t } from '@backend/core/trpc/trpcContext';
import { getMasterData } from '../usecase/getMasterData';
import { IconCategoryRepository } from '@backend/features/icon-category/repository/iconCategoryRepository';
import { IconCategoryDao } from '@backend/features/icon-category/dao/iconCategoryDao';
import { IconCategoryTranslationDao } from '@backend/features/icon-category/dao/iconCategoryTranslationDao';
import { IconDao } from '@backend/features/icon/dao/iconDao';
import { IconCategories, IconCategoriesSchema } from '@backend/features/icon-category/domain/iconCategories';
import { FamilyMemberTypeSchema } from '@backend/features/family-member/enum/familyMemberType';
import { LanguageTypeSchema } from '@backend/features/language/enum/languageType';
import z from 'zod';

export const GetMasterDataResponseScheme = z.object({
  languages: LanguageTypeSchema,
  familyMemberTypes: FamilyMemberTypeSchema,
  iconCategories: IconCategoriesSchema,
});

/**
 * マスタデータに関するtRPCルーター
 */
export const initRouter = t.router({
  /**
   * マスタデータ取得エンドポイント
   * 言語Enumと家族メンバータイプEnum、アイコンカテゴリのZodスキーマを返す
   */
  getMasterData: t.procedure
    .output(GetMasterDataResponseScheme)
    .query(async ({ ctx }) => {
      try {
        // リポジトリの依存関係を作成
        console.log('🔍 DAO初期化開始');
        const iconCategoryDao = new IconCategoryDao(ctx.session);
        console.log('🔍 IconCategoryDao初期化完了');
        const iconCategoryTranslationDao = new IconCategoryTranslationDao(ctx.session);
        console.log('🔍 IconCategoryTranslationDao初期化完了');
        const iconDao = new IconDao(ctx.session);
        console.log('🔍 IconDao初期化完了');
        
        const iconCategoryRepository = new IconCategoryRepository({
          iconCategoryDao,
          iconCategoryTranslationDao,
          iconDao
        });
        console.log('🔍 Repository初期化完了');
        
        console.log('🔍 getMasterDataユースケース呼び出し開始');
        const result = await getMasterData(iconCategoryRepository);
        console.log('🔍 getMasterDataユースケース完了:', result);
        return result;
      } catch (error) {
        console.error('❌ initRouter catchブロック - マスタデータ取得エラー:', error);
        console.error('❌ エラータイプ:', typeof error);
        console.error('❌ エラーインスタンス:', error instanceof Error);
        console.error('❌ エラーメッセージ:', error instanceof Error ? error.message : '不明');
        console.error('❌ エラースタック:', error instanceof Error ? error.stack : 'スタック情報なし');
     
        console.error('❌ マスタデータ取得エラー:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'マスタデータ取得中にエラーが発生しました',
        });
      }
    }),
});
export type GetMasterDataResponse = z.infer<typeof GetMasterDataResponseScheme>;
export interface GetMasterDataHandler {
  query(): Promise<GetMasterDataResponse>;
}
