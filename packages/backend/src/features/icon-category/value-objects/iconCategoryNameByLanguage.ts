import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { CollectionItemProtocol } from '@backend/core/models/baseCollection';
import { IconCategoryName } from './iconCategoryName';

/**
 * アイコンカテゴリ名の言語別値オブジェクト（集約）
 */
export class IconCategoryNameByLanguage implements CollectionItemProtocol<LanguageId> {
  private readonly _language: LanguageTypeValue;
  private _categoryName: IconCategoryName;

  constructor(language: LanguageTypeValue, categoryName: IconCategoryName) {
    this._language = language;
    this._categoryName = categoryName;
  }
  toZodData() {
    throw new Error('Method not implemented.');
  }
  setFromZodData(data: any): void {
    throw new Error('Method not implemented.');
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
}
