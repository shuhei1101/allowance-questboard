import { useCallback } from 'react';
import { UserRegisterForm } from '../models/userRegisterForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { ClearErrors, SetFormError } from '../../../../core/stores/baseFormStore';

export type UseUserCreateFormValidationHandler = (params: {
  userCreateForm: UserRegisterForm;
  currentLanguageType: LanguageTypeValue;
  clearErrors: ClearErrors;
  setEmailError: SetFormError;
  setPasswordError: SetFormError;
}) => () => ValidationResult;

/** バリデーション結果 */
export interface ValidationResult {
  isValid: boolean;
}

/** 新規登録フォームのバリデーションハンドラー
 *
 * フォームの入力内容をバリデーションし、エラーメッセージを設定する */
export const useUserCreateFormValidationHandler: UseUserCreateFormValidationHandler = (params) => {
  return useCallback((): ValidationResult => {
    // エラーをクリア
    params.clearErrors();

    let hasValidationError = false;

    // メールアドレスのバリデーション
    if (!params.userCreateForm.email.isValid) {
      params.setEmailError(params.userCreateForm.email.errorMessage?.getMessage(params.currentLanguageType) || 'メールアドレスが無効です');
      hasValidationError = true;
    }

    // パスワードのバリデーション
    if (!params.userCreateForm.password.isValid) {
      params.setPasswordError(params.userCreateForm.password.errorMessage?.getMessage(params.currentLanguageType) || 'パスワードが無効です');
      hasValidationError = true;
    }

    return {
      isValid: !hasValidationError
    };
  }, [
    params.userCreateForm,
    params.currentLanguageType,
    params.clearErrors,
    params.setEmailError,
    params.setPasswordError
  ]);
};
