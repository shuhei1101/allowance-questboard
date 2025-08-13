import { LanguageDao } from '../dao/languageDao';
import { LanguageType } from '../enum/languageType';

/**
 * 言語リポジトリの依存関係
 */
export interface LanguageRepositoryParams {
  languageDao: LanguageDao;
}

/**
 * 言語リポジトリクラス
 * 言語マスタデータの操作を管理する
 */
export class LanguageRepository {
  constructor(private params: LanguageRepositoryParams) {}

  /**
   * 言語Enumの更新メソッド
   * DAOを使用してEntityを取得し、EntityからEnum値を更新する
   * @returns Promise<void>
   */
  async updateLanguageEnum(): Promise<void> {
    try {
      // DAOを使用してエンティティを取得
      const languageEntities = await this.params.languageDao.fetchAll();
      
      // EntityからEnum値を更新
      LanguageType.updateFromEntities(languageEntities);
      
    } catch (error) {
      throw new Error(`言語Enum更新中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
