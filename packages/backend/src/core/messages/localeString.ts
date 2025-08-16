import { LanguageTypeValue } from "@backend/features/language/value-object/languageTypeValue";

export class LocaleString {
  private readonly _ja: string
  private readonly _en: string

  constructor(params: {
    ja: string;
    en: string;
  }) {
    this._ja = params.ja;
    this._en = params.en;
  }

  get ja(): string {
    return this._ja;
  }
  get en(): string {
    return this._en;
  }
  
  getMessage(languageType: LanguageTypeValue): string {
    // 値で比較する（LanguageTypeのenum値を直接使用）
    if (languageType.id.value === 1) { // JAPANESE
      return this.ja;
    } else if (languageType.id.value === 2) { // ENGLISH
      return this.en;
    } else {
      throw new Error(`Unsupported language type: ${languageType}`);
    }
  }
}
