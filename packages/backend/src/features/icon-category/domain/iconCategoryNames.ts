import { IconCategoryNameByLanguage, IconCategoryNameByLanguageSchema } from './iconCategoryNameByLanguage';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { BaseCollection } from '@backend/core/models/baseCollection';
import { z } from 'zod';

/**
 * IconCategoryNamesのZodスキーマ
 */
export const IconCategoryNamesSchema = z.object({
  items: z.array(IconCategoryNameByLanguageSchema)
});

/**
 * アイコンカテゴリ名の値オブジェクト集約
 */
export class IconCategoryNames extends BaseCollection<IconCategoryNameByLanguage, LanguageId> {
  constructor(items: IconCategoryNameByLanguage[]) {
    super(items);
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoryNamesSchema> {
    return {
      items: this.items.map(item => item.toZodData())
    };
  }

  /**
   * Zodスキーマから新しいIconCategoryNamesインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconCategoryNamesSchema>): IconCategoryNames {
    const items = data.items.map(item => IconCategoryNameByLanguage.fromZodData(item));
    return new IconCategoryNames(items);
  }

  /**
   * カスタムインデックス更新
   */
  protected updateCustomIndex(): void {
    // デフォルト辞書以外を使用する場合はここで実装
  }
}
