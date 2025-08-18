import { LanguageTypeValue, LanguageTypeValueSchema } from '@backend/features/language/value-object/languageTypeValue';
import { getLanguageTypeFromZodData } from '@backend/features/language/enum/languageType';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { CollectionItemProtocol } from '@backend/core/models/baseCollection';
import { IconCategoryName, IconCategoryNameSchema } from './iconCategoryName';
import { z } from 'zod';

/**
 * IconCategoryNameByLanguageのZodスキーマ
 */
export const IconCategoryNameByLanguageSchema = z.object({
  language: LanguageTypeValueSchema,
  categoryName: IconCategoryNameSchema
});

/**
 * アイコンカテゴリ名の言語別値オブジェクト（集約）
 */
export class IconCategoryNameByLanguage implements CollectionItemProtocol<LanguageId> {

  constructor(
    public readonly language: LanguageTypeValue, 
    public readonly categoryName: IconCategoryName
  ) {}

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoryNameByLanguageSchema> {
    return {
      language: this.language.toZodData(),
      categoryName: this.categoryName.toZodData()
    };
  }

  /**
   * Zodスキーマから新しいIconCategoryNameByLanguageインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconCategoryNameByLanguageSchema>): IconCategoryNameByLanguage {
    return new IconCategoryNameByLanguage(
      getLanguageTypeFromZodData(data.language),
      IconCategoryName.fromZodData(data.categoryName)
    );
  }

  /**
   * 言語タイプをIDとして返す
   */
  get id(): LanguageId {
    return this.language.id;
  }

  /**
   * カテゴリ名の文字列値を取得
   */
  get value(): string {
    return this.categoryName.value;
  }

  /**
   * バリデーション実行
   */
  validate(): void {
    // IconCategoryNameのバリデーションは内部で実行される
    // 追加のバリデーションがあればここで実行
  }
}
