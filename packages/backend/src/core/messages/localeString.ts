import { LanguageTypeValue } from "@backend/features/language/value-object/languageTypeValue";

export class LocaleString {
  readonly ja: string
  readonly en: string

  constructor(params: {
    ja: string;
    en: string;
  }) {
    this.ja = params.ja;
    this.en = params.en;
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
