import { useCallback } from 'react';
import { ParentForm } from '../../models/parentForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { ClearErrors, SetFormError } from '../../../../../core/stores/baseFormStore';

/**
 * バリデーション結果
 */
export interface ValidationResult {
  isValid: boolean;
}

/**
 * 親編集フォームのバリデーションハンドラー
 * 
 * フォームの入力内容をバリデーションし、エラーメッセージを設定する
 */
export const useParentFormValidationHandler = (params: {
  parentForm: ParentForm;
  currentLanguageType: LanguageTypeValue;
  clearErrors: ClearErrors;
  setNameError: SetFormError;
  setEmailError: SetFormError;
  setPasswordError: SetFormError;
  setBirthdayError: SetFormError;
}) => {
  return useCallback((): ValidationResult => {
    // エラーをクリア
    params.clearErrors();

    let hasValidationError = false;

    // 名前のバリデーション
    if (!params.parentForm.name.isValid) {
      params.setNameError(params.parentForm.name.errorMessage?.getMessage(params.currentLanguageType) || '名前が無効です');
      hasValidationError = true;
    }

    // メールアドレスのバリデーション
    if (!params.parentForm.email.isValid) {
      params.setEmailError(params.parentForm.email.errorMessage?.getMessage(params.currentLanguageType) || 'メールアドレスが無効です');
      hasValidationError = true;
    }

    // パスワードのバリデーション
    if (!params.parentForm.password.isValid) {
      params.setPasswordError(params.parentForm.password.errorMessage?.getMessage(params.currentLanguageType) || 'パスワードが無効です');
      hasValidationError = true;
    }

    // 誕生日のバリデーション
    if (!params.parentForm.birthday.isValid) {
      params.setBirthdayError(params.parentForm.birthday.errorMessage?.getMessage(params.currentLanguageType) || '誕生日が無効です');
      hasValidationError = true;
    }

    return {
      isValid: !hasValidationError
    };
  }, [
    params.parentForm,
    params.currentLanguageType,
    params.clearErrors,
    params.setNameError,
    params.setEmailError,
    params.setPasswordError,
    params.setBirthdayError
  ]);
};
