import { BaseValueObject } from '@backend/core/value-object/baseValueObject';
import { LocaleString } from '@backend/core/messages/localeString';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { CollectionItemProtocol } from '@backend/core/models/baseCollection';
import { IconCategoryName, IconCategoryNameSchema } from './iconCategoryName';
import { z } from 'zod';

/**
 * IconCategoryNameByLanguageのZodスキーマ
 */
export const IconCategoryNameByLanguageSchema = z.object({
  languageId: z.number(),
  categoryName: IconCategoryNameSchema
});

/**
 * アイコンカテゴリ名の言語別値オブジェクト（集約）
 */
export class IconCategoryNameByLanguage implements CollectionItemProtocol<LanguageId> {
  private readonly _language: LanguageTypeValue;
  private readonly _categoryName: IconCategoryName;

  constructor(language: LanguageTypeValue, categoryName: IconCategoryName) {
    this._language = language;
    this._categoryName = categoryName;
  }

  /**
   * 言語タイプをIDとして返す
   */
  get id(): LanguageId {
    return this._language.id;
  }

  /**
   * 言語タイプを取得
   */
  get language(): LanguageTypeValue {
    return this._language;
  }

  /**
   * カテゴリ名値オブジェクトを取得
   */
  get categoryName(): IconCategoryName {
    return this._categoryName;
  }

  /**
   * カテゴリ名の文字列値を取得
   */
  get value(): string {
    return this._categoryName.value;
  }

  /**
   * バリデーション実行
   */
  validate(): void {
    // IconCategoryNameのバリデーションは内部で実行される
    // 追加のバリデーションがあればここで実行
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoryNameByLanguageSchema> {
    return {
      languageId: this._language.id.value,
      categoryName: this._categoryName.toZodData()
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof IconCategoryNameByLanguageSchema>): void {
    // 言語IDの一致チェック
    if (data.languageId !== this._language.id.value) {
      throw new Error(`Language ID mismatch: expected ${this._language.id.value}, got ${data.languageId}`);
    }
    // カテゴリ名の値オブジェクトを初期化
    this._categoryName = IconCategoryName.fromZodData(data.categoryName);
  }

  /**
   * Zodスキーマから新しいIconCategoryNameByLanguageインスタンスを作成（推奨方法）
   * @param data Zodスキーマに準拠したデータ
   * @param languageTypeValue 言語タイプ値オブジェクト
   */
  static fromZodData(data: z.infer<typeof IconCategoryNameByLanguageSchema>, languageTypeValue: LanguageTypeValue): IconCategoryNameByLanguage {
    // 言語IDの一致チェック
    if (data.languageId !== languageTypeValue.id.value) {
      throw new Error(`Language ID mismatch: expected ${languageTypeValue.id.value}, got ${data.languageId}`);
    }
    
    const categoryName = IconCategoryName.fromZodData(data.categoryName);
    return new IconCategoryNameByLanguage(languageTypeValue, categoryName);
  }
}
