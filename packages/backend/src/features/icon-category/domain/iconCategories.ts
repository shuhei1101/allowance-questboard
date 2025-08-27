import { BaseCollection } from '@backend/core/models/baseCollection';
import { IconCategoryId } from '../value-objects/iconCategoryId';
import { IconCategory, IconCategorySchema } from './iconCategory';
import { Icons } from '../../icon/domain/icons';
import { Icon } from '../../icon/domain/icon';
import { z } from 'zod';

/**
 * IconCategoriesのZodスキーマ
 */
export const IconCategoriesSchema = z.object({
  items: z.array(IconCategorySchema)
});

/**
 * アイコンカテゴリのファーストクラスコレクション
 */
export class IconCategories extends BaseCollection<IconCategory, IconCategoryId> {
  constructor(items: IconCategory[]) {
    super(items);
  }
  /**
   * 全てのアイコンを取得
   */
  getAllIcons(): Icons {
    const allIcons: Icon[] = [];
    
    // 全てのカテゴリから中のアイコンを取得して配列に追加
    for (const category of this.items) {
      allIcons.push(...category.icons.items);
    }
    
    return new Icons(allIcons);
  }

  /**
   * カスタムインデックス更新
   * 現在は特別なインデックスを持たないため、何もしない
   */
  protected updateCustomIndex(): void {
    // デフォルト辞書以外を使用する場合はここで実装
  }

  /**
   * アクティブなアイコンカテゴリを取得
   */
  getActiveCategories(): IconCategory[] {
    return this.items.filter(category => category.isActive);
  }

  /**
   * ソート順で並べ替えたアイコンカテゴリを取得
   */
  getSortedCategories(): IconCategory[] {
    return [...this.items].sort((a, b) => a.sortOrder.value - b.sortOrder.value);
  }

  /**
   * アクティブかつソート順で並べ替えたアイコンカテゴリを取得
   */
  getActiveSortedCategories(): IconCategory[] {
    return this.getActiveCategories().sort((a, b) => a.sortOrder.value - b.sortOrder.value);
  }

  /**
   * 各アイコンカテゴリにアイコンを設定する
   * @param icons 全てのアイコン
   */
  setIcons(icons: Icons): void {
    for (const category of this.items) {
      if (category.key === undefined ) continue; // keyがundefinedのカテゴリはスキップ
      // このカテゴリに属するアイコンを抽出
      const categoryIcons = icons.getByCategory(category.key);
      category.icons = new Icons(categoryIcons);
    }
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoriesSchema> {
    return {
      items: this.items.map(category => category.toZodData())
    };
  }

  /**
   * Zodスキーマから新しいIconCategoriesインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconCategoriesSchema>): IconCategories {
    const items = data.items.map(item => IconCategory.fromZodData(item));
    return new IconCategories(items);
  }
}
