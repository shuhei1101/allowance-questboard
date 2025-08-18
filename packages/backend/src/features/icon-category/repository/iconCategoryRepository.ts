import { IconCategoryDao } from '../dao/iconCategoryDao';
import { IconCategoryTranslationDao } from '../dao/iconCategoryTranslationDao';
import { IconDao } from '../../icon/dao/iconDao';
import { IconCategories } from '../domain/iconCategories';
import { BaseAppException } from '@backend/core/errors/baseAppException';
import { LocaleString } from '@backend/core/messages/localeString';
import { IconsFactory } from '@backend/features/icon/domain/iconsFactory';
import { IconCategoriesFactory } from '../domain/iconCategoriesFactory';

/**
 * アイコンカテゴリリポジトリの依存関係
 */
export interface IconCategoryRepositoryParams {
  iconCategoryDao: IconCategoryDao;
  iconCategoryTranslationDao: IconCategoryTranslationDao;
  iconDao: IconDao;
}

/**
 * アイコンカテゴリリポジトリクラス
 * アイコンカテゴリマスタデータの操作を管理する
 */
export class IconCategoryRepository {
  constructor(private params: IconCategoryRepositoryParams) {}

  /**
   * アイコンカテゴリ一覧を取得し、各カテゴリに属するアイコンも含めて返す
   * @returns Promise<IconCategories>
   */
  async findAllWithIcons(): Promise<IconCategories> {
    try {
      // アイコンカテゴリエンティティを取得
      const categoryEntities = await this.params.iconCategoryDao.fetchAll();
      
      // アイコンカテゴリ翻訳データを取得
      const translationEntities = await this.params.iconCategoryTranslationDao.findAllTranslationsWithCache();
      
      // アイコンエンティティを取得
      const iconEntities = await this.params.iconDao.fetchAll();
      
      // アイコンエンティティからドメインモデルに変換
      const icons = IconsFactory.fromEntity({entities: iconEntities});
      
      const iconCategories = IconCategoriesFactory.fromEntity({
        entities: categoryEntities,
        translationEntities: translationEntities,
        icons
      });
      
      return iconCategories;
      
    } catch (error) {
      throw new BaseAppException({
        errorType: 'ICON_CATEGORY_REPOSITORY_ERROR',
        message: new LocaleString({
          ja: 'アイコンカテゴリの取得に失敗しました',
          en: 'Failed to fetch icon categories'
        })
      });
    }
  }
}
