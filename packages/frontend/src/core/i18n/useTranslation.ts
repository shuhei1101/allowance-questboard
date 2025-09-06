import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { SupportedLanguage, languageNames } from './index';

/**
 * 多言語化用のカスタムhook
 * react-i18nextをReact Native用にラップしたもの
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nextTranslation();
  
  /**
   * 言語を変更する関数
   * @param language 変更したい言語コード
   */
  const changeLanguage = useCallback(async (language: SupportedLanguage) => {
    try {
      await i18n.changeLanguage(language);
    } catch (error) {
      console.error('言語変更エラー:', error);
    }
  }, [i18n]);
  
  /**
   * 現在の言語コードを取得
   */
  const currentLanguage = i18n.language as SupportedLanguage;
  
  /**
   * 現在の言語の表示名を取得
   */
  const currentLanguageName = languageNames[currentLanguage] || languageNames.ja;
  
  /**
   * 言語が読み込み完了しているか
   */
  const isReady = i18n.isInitialized;
  
  return {
    t,
    changeLanguage,
    currentLanguage,
    currentLanguageName,
    isReady,
    // 便利関数
    isJapanese: currentLanguage === 'ja',
    isEnglish: currentLanguage === 'en',
  };
};

/**
 * 翻訳のタイプセーフティ用のヘルパー型
 */
export type TranslationKey = 
  | 'app.title'
  | 'app.description'
  | 'login.title'
  | 'login.emailPlaceholder'
  | 'login.passwordPlaceholder'
  | 'login.loginButton'
  | 'login.createFamilyButton'
  | 'login.forgotPassword'
  | 'login.termsOfService'
  | 'login.selectLoginType'
  | 'login.parentLogin'
  | 'login.childLogin'
  | 'login.cancel'
  | 'login.familyLabel'
  | 'login.errors.invalidCredentials'
  | 'login.errors.loginFailed'
  | 'login.errors.parentLoginFailed'
  | 'login.errors.childLoginFailed'
  | 'login.success.parentLogin'
  | 'login.success.childLogin'
  | 'login.navigation.createFamily'
  | 'login.navigation.forgotPassword'
  | 'login.navigation.termsOfService'
  | 'auth.createUser.confirmBackTitle'
  | 'auth.createUser.confirmBackMessage'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.confirm'
  | 'common.ok'
  | 'common.yes'
  | 'common.no'
  | 'common.cancel'
  | 'common.discard';
