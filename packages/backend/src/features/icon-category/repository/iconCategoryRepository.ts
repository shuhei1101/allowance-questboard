import { IconCategoryDao } from '../dao/iconCategoryDao';

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

  
}
