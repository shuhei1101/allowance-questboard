import { BaseValueObject } from '@backend/core/value-object/baseValueObject';
import { LocaleString } from '@backend/core/messages/localeString';
import { z } from 'zod';

/**
 * IconCategoryNameのZodスキーマ
 */
export const IconCategoryNameSchema = z.object({
  value: z.string()
});

/**
 * アイコンカテゴリ名の値オブジェクト
 * シンプルな文字列値を扱う
 */
export class IconCategoryName extends BaseValueObject<string, typeof IconCategoryNameSchema> {
  
  constructor(value: string) {
    super({ value });
  }

  /**
   * バリデーション実行
   */
  protected validate(): void {
    this.validator.required();
    this.validator.maxLength(100, new LocaleString({
      ja: "アイコンカテゴリ名は100文字以内で入力してください",
      en: "Icon category name must be within 100 characters"
    }));
  }

  /**
   * 値オブジェクトの名前を取得
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: 'アイコンカテゴリ名',
      en: 'Icon Category Name'
    });
  }

  /**
   * Zodスキーマを取得
   */
  protected get zodSchema(): typeof IconCategoryNameSchema {
    return IconCategoryNameSchema;
  }

  /**
   * Zodスキーマから新しいIconCategoryNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconCategoryNameSchema>): IconCategoryName {
    return new IconCategoryName(data.value);
  }
}
