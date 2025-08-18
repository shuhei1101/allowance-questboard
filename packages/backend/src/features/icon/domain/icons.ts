import { BaseCollection } from '@backend/core/models/baseCollection';
import { IconId } from '../value-objects/iconId';
import { Icon } from './icon';
import { IconCategoryId } from '../../icon-category/value-objects/iconCategoryId';

/**
 * アイコンのファーストクラスコレクション
 */
export class Icons extends BaseCollection<Icon, IconId> {
  constructor(items: Icon[]) {
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
   * アクティブなアイコンを取得
   */
  getActiveIcons(): Icon[] {
    return this._items.filter(icon => icon.isActive);
  }

  /**
   * ソート順で並べ替えたアイコンを取得
   */
  getSortedIcons(): Icon[] {
    return [...this._items].sort((a, b) => a.sortOrder.value - b.sortOrder.value);
  }

  /**
   * アクティブかつソート順で並べ替えたアイコンを取得
   */
  getActiveSortedIcons(): Icon[] {
    return this.getActiveIcons().sort((a, b) => a.sortOrder.value - b.sortOrder.value);
  }

  /**
   * 指定したカテゴリのアイコンを取得
   * @param categoryId アイコンカテゴリID
   */
  getByCategory(categoryId: IconCategoryId): Icon[] {
    return this._items.filter(icon => 
      icon.iconCategoryId?.equals(categoryId) === true
    );
  }

  /**
   * カテゴリが未設定のアイコンを取得
   */
  getUncategorizedIcons(): Icon[] {
    return this._items.filter(icon => icon.iconCategoryId === undefined);
  }

  /**
   * 指定したカテゴリのアクティブなアイコンを取得
   * @param categoryId アイコンカテゴリID
   */
  getActiveByCategoryId(categoryId: IconCategoryId): Icon[] {
    return this.getByCategory(categoryId).filter(icon => icon.isActive);
  }

  /**
   * アイコン名で検索
   * @param name 検索するアイコン名（部分一致）
   */
  searchByName(name: string): Icon[] {
    const searchTerm = name.toLowerCase();
    return this._items.filter(icon => 
      icon.name.value.toLowerCase().includes(searchTerm)
    );
  }
}
