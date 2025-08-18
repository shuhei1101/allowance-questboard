import { IconCategoryDao } from '../dao/iconCategoryDao';
import { IconCategoryTranslationDao } from '../dao/iconCategoryTranslationDao';
import { IconDao } from '../../icon/dao/iconDao';
import { IconCategories } from '../domain/iconCategories';
import { IconCategory } from '../domain/iconCategory';
import { Icons } from '../../icon/domain/icons';
import { Icon } from '../../icon/domain/icon';
import { BaseAppException } from '@backend/core/errors/baseAppException';
import { LocaleString } from '@backend/core/messages/localeString';

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
      
      // エンティティからドメインモデルに変換
      const iconCategoryList: IconCategory[] = [];
      for (const categoryEntity of categoryEntities) {
        // この カテゴリの翻訳データを抽出
        const categoryTranslations = translationEntities.getBySourceId(categoryEntity.id);
        
        // ドメインモデルに変換（アイコンは後で設定）
        const iconCategory = IconCategory.fromEntity(categoryEntity, categoryTranslations);
        iconCategoryList.push(iconCategory);
      }
      
      // アイコンエンティティからドメインモデルに変換
      const iconList: Icon[] = iconEntities.map((iconEntity) => Icon.fromEntity(iconEntity));
      const icons = new Icons(iconList);
      
      // アイコンカテゴリコレクションを作成
      const iconCategories = new IconCategories(iconCategoryList);
      
      // 各カテゴリにアイコンを設定
      iconCategories.setIcons(icons);
      
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
