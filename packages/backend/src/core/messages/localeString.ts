import { LanguageType } from "@backend/features/language/enum/languageType";
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
    switch (languageType) {
      case LanguageType.JAPANESE:
        return this.ja;
      case LanguageType.ENGLISH:
        return this.en;
      default:
        throw new Error(`Unsupported language type: ${languageType}`);
    }
  }
}
