import { BaseValueObject } from '@backend/core/value-object/baseValueObject';
import { LocaleString } from '@backend/core/messages/localeString';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { CollectionItemProtocol } from '@backend/core/models/baseCollection';
import { z } from 'zod';

/**
 * IconCategoryNameByLanguageのZodスキーマ
 */
export const IconCategoryNameByLanguageSchema = z.object({
  languageId: z.number(),
  value: z.string()
});

/**
 * アイコンカテゴリ名の言語別値オブジェクト（集約）
 */
export class IconCategoryNameByLanguage extends BaseValueObject<string> implements CollectionItemProtocol<LanguageId> {
  private readonly _language: LanguageTypeValue;

  constructor(language: LanguageTypeValue, value: string) {
    super({ value });
    this._language = language;
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
   * バリデーション実行
   */
  protected validate(): void {
    this.validator.required();
  }

  /**
   * 値オブジェクトの名前を取得
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: 'アイコンカテゴリ名（言語別）',
      en: 'Icon Category Name By Language'
    });
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoryNameByLanguageSchema> {
    return {
      languageId: this._language.id.value,
      value: this.value
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化
   * このクラスは読み取り専用なので、新しいインスタンスを作成することを推奨
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof IconCategoryNameByLanguageSchema>): void {
    // 言語IDの一致チェック
    if (data.languageId !== this._language.id.value) {
      throw new Error(`Language ID mismatch: expected ${this._language.id.value}, got ${data.languageId}`);
    }
    
    // BaseValueObjectの内部的な値を更新
    // 注意: この操作は通常推奨されないが、setFromZodDataの実装として提供
    (this as any)._value = data.value;
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
    
    return new IconCategoryNameByLanguage(languageTypeValue, data.value);
  }
}
