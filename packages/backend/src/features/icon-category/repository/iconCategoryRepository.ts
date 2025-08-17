import { IconCategoryDao } from '../dao/iconCategoryDao';
import { IconCategory } from '../enum/iconCategory';

/**
 * アイコンカテゴリリポジトリの依存関係
 */
export interface IconCategoryRepositoryParams {
  iconCategoryDao: IconCategoryDao;
}

/**
 * アイコンカテゴリリポジトリクラス
 * アイコンカテゴリマスタデータの操作を管理する
 */
export class IconCategoryRepository {
  constructor(private params: IconCategoryRepositoryParams) {}

  /**
   * アイコンカテゴリEnumの更新メソッド
   * DAOを使用してEntityを取得し、EntityからEnum値を更新する
   * @returns Promise<void>
   */
  async updateIconCategoryEnum(): Promise<void> {
    try {
      // メインエンティティと翻訳エンティティを一緒に取得
      const { entities, translations } = await this.params.iconCategoryDao.fetchAllWithTranslations();
      
      // Enumの値を更新
      IconCategory.updateFromEntities(entities, translations);
      
    } catch (error) {
      throw new Error(`アイコンカテゴリEnum更新中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
