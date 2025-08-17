import { BaseValueObject } from '@backend/core/value-object/baseValueObject';
import { LocaleString } from '@backend/core/messages/localeString';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { CollectionItemProtocol } from '@backend/core/models/baseCollection';

/**
 * アイコンカテゴリ名の値オブジェクト
 */
export class IconCategoryName extends BaseValueObject<string> implements CollectionItemProtocol<LanguageId> {
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
      ja: 'アイコンカテゴリ名',
      en: 'Icon Category Name'
    });
  }
}
