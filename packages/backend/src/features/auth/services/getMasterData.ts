import { AppError } from "@backend/core/errors/appError";
import { LocaleString } from "@backend/core/messages/localeString";
import { FamilyMemberType } from "@backend/features/family-member/enum/familyMemberType";
import { LanguageType } from "@backend/features/language/enum/languageType";
import { IconCategoryRepository } from "@backend/features/icon-category/repository/iconCategoryRepository";

/**
 * マスタデータを取得する
 * 言語Enumと家族メンバータイプEnum、アイコンカテゴリのtoZodDataメソッドを呼び出し、Zodスキーマ形式で返す
 * @param iconCategoryRepository アイコンカテゴリリポジトリ
 * @returns マスタデータのZodスキーマ
 */
export async function getMasterData(iconCategoryRepository: IconCategoryRepository) {
  try {
    // アイコンカテゴリを取得
    const iconCategories = await iconCategoryRepository.findAllWithIcons();
    
    return {
      languages: LanguageType.toZodData(),
      familyMemberTypes: FamilyMemberType.toZodData(),
      iconCategories: iconCategories.toZodData(),
    };
  } catch (error) {
    throw new AppError({
      errorType: 'GET_MASTER_DATA_ERROR',
      message: new LocaleString({
        ja: 'マスタデータの取得に失敗しました',
        en: 'Failed to fetch master data'
      })
    });
  }
}

// 動作確認
if (require.main === module) {
  (async () => {
    try {
      console.log('🚀 getMasterData動作確認開始');
      
      // データベース接続を初期化
      const { AppDataSource } = await import('@backend/core/config/dataSource');
      await AppDataSource.initialize();
      console.log('✅ データベース接続完了');
      
      // セッション作成
      const session = AppDataSource.manager;
      console.log('✅ セッション作成完了');
      
      // リポジトリの依存関係を作成
      const { IconCategoryDao } = await import('@backend/features/icon-category/dao/iconCategoryDao');
      const { IconCategoryTranslationDao } = await import('@backend/features/icon-category/dao/iconCategoryTranslationDao');
      const { IconDao } = await import('@backend/features/icon/dao/iconDao');
      const { IconCategoryRepository } = await import('@backend/features/icon-category/repository/iconCategoryRepository');
      
      const iconCategoryDao = new IconCategoryDao(session);
      const iconCategoryTranslationDao = new IconCategoryTranslationDao(session);
      const iconDao = new IconDao(session);
      
      const iconCategoryRepository = new IconCategoryRepository({
        iconCategoryDao,
        iconCategoryTranslationDao,
        iconDao
      });
      console.log('✅ リポジトリ初期化完了');
      
      // getMasterDataを実行
      const result = await getMasterData(iconCategoryRepository);
      const result2 = await getMasterData(iconCategoryRepository);
      console.log('✅ getMasterData実行完了');
      console.log('📋 結果:', JSON.stringify(result, undefined, 2));
      console.log('📋 結果2:', JSON.stringify(result2, undefined, 2));

      // セッション解放
      await AppDataSource.destroy();
      console.log('✅ リソース解放完了');
      console.log('🎉 動作確認完了！');
      process.exit(0);
      
    } catch (error) {
      console.error('❌ Error fetching master data:', error);
      process.exit(1);
    }
  })();
}
