import { BaseCollection } from '@backend/core/models/baseCollection';
import { IconCategoryId } from '../value-objects/iconCategoryId';
import { IconCategory } from './iconCategory';

/**
 * アイコンカテゴリのファーストクラスコレクション
 */
export class IconCategories extends BaseCollection<IconCategory, IconCategoryId> {
  constructor(items: IconCategory[]) {
    super(items);
  }

  /**
   * カスタムインデックス更新
   * 現在は特別なインデックスを持たないため、何もしない
   */
  protected _updateCustomIndex(): void {
    // デフォルト辞書以外を使用する場合はここで実装
  }

  /**
   * アクティブなアイコンカテゴリを取得
   */
  getActiveCategories(): IconCategory[] {
    return this._items.filter(category => category.isActive);
  }

  /**
   * ソート順で並べ替えたアイコンカテゴリを取得
   */
  getSortedCategories(): IconCategory[] {
    return [...this._items].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  /**
   * アクティブかつソート順で並べ替えたアイコンカテゴリを取得
   */
  getActiveSortedCategories(): IconCategory[] {
    return this.getActiveCategories().sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
