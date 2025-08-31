import { useCallback } from 'react';
import { ClearErrors, SetEmailError, SetPasswordError } from '../loginPageStore';
import { LoginForm } from '../models/loginForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

/**
 * バリデーション結果
 */
export interface ValidationResult {
  isValid: boolean;
}

/**
 * ログインフォームのバリデーションハンドラー
 * 
 * フォームの入力内容をバリデーションし、エラーメッセージを設定する
 */
export const useLoginFormValidationHandler = (params: {
  loginForm: LoginForm;
  currentLanguageType: LanguageTypeValue;
  clearErrors: ClearErrors;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
}) => {
  return useCallback((): ValidationResult => {
    // エラーをクリア
    params.clearErrors();

    let hasValidationError = false;

    // メールアドレスのバリデーション
    if (!params.loginForm.email.isValid) {
      params.setEmailError(params.loginForm.email.errorMessage?.getMessage(params.currentLanguageType) || 'メールアドレスが無効です');
      hasValidationError = true;
    }

    // パスワードのバリデーション
    if (!params.loginForm.password.isValid) {
      params.setPasswordError(params.loginForm.password.errorMessage?.getMessage(params.currentLanguageType) || 'パスワードが無効です');
      hasValidationError = true;
    }

    return {
      isValid: !hasValidationError
    };
  }, [
    params.loginForm,
    params.currentLanguageType,
    params.clearErrors,
    params.setEmailError,
    params.setPasswordError
  ]);
};
