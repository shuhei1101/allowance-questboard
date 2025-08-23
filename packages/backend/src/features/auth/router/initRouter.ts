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
        const iconCategoryDao = new IconCategoryDao(ctx.session);
        const iconCategoryTranslationDao = new IconCategoryTranslationDao(ctx.session);
        const iconDao = new IconDao(ctx.session);
        
        const iconCategoryRepository = new IconCategoryRepository({
          iconCategoryDao,
          iconCategoryTranslationDao,
          iconDao
        });
        
        return await getMasterData(iconCategoryRepository);
      } catch (error) {
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
