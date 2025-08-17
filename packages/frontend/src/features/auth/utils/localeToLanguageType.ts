import { LanguageType } from '@backend/features/language/enum/languageType';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

/**
 * システムの言語コード（locale）をLanguageTypeValueに変換する
 * @param locale システムの言語コード（例: 'ja-JP', 'en-US', 'ja', 'en'）
 * @returns LanguageTypeValue
 */
export const localeToLanguageType = (locale: string): LanguageTypeValue => {
  // localeの先頭2文字を取得（'ja-JP' -> 'ja', 'en-US' -> 'en'）
  const languageCode = locale.substring(0, 2).toLowerCase();
  
  switch (languageCode) {
    case 'ja':
      return LanguageType.JAPANESE;
    case 'en':
      return LanguageType.ENGLISH;
    default:
      // デフォルトは日本語
      return LanguageType.JAPANESE;
  }
};
