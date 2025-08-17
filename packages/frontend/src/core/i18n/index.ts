import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// JSON翻訳ファイルをインポート
import jaTranslations from './locales/ja.json';
import enTranslations from './locales/en.json';

// システム言語を取得（フォールバックは日本語）
const getDeviceLanguage = (): string => {
  try {
    const deviceLocale = Localization.getLocales()[0]?.languageCode || 'ja';
    console.log('🌐 Device language detected:', deviceLocale);
    
    // サポートされている言語かチェック
    const supportedLanguages = ['ja', 'en'];
    return supportedLanguages.includes(deviceLocale) ? deviceLocale : 'ja';
  } catch (error) {
    console.warn('言語取得エラー:', error);
    return 'ja';
  }
};

i18n
  .use(initReactI18next)
  .init({
    // 初期言語をシステム言語から設定
    lng: getDeviceLanguage(),
    
    // フォールバック言語
    fallbackLng: 'ja',
    
    // デバッグモード（開発時のみ）
    debug: __DEV__,
    
    // 翻訳リソース
    resources: {
      ja: {
        translation: jaTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    
    // 補間設定
    interpolation: {
      escapeValue: false, // React Native では不要
    },
    
    // 名前空間の設定
    ns: ['translation'],
    defaultNS: 'translation',
    
    // キーが見つからない場合の処理
    saveMissing: __DEV__,
    
    // React設定
    react: {
      useSuspense: false,
    },
  });

export default i18n;

/**
 * システム言語を取得するヘルパー関数
 */
export const getSystemLanguage = (): string => {
  return getDeviceLanguage();
};

/**
 * サポートしている言語のリスト
 */
export const supportedLanguages = ['ja', 'en'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

/**
 * 言語表示名のマップ
 */
export const languageNames = {
  ja: '日本語',
  en: 'English',
} as const;
