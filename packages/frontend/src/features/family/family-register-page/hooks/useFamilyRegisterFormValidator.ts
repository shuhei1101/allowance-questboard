import { useCallback } from 'react';
import { FamilyRegisterForm } from '../models/familyRegisterForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { ClearErrors, SetFormError } from '../../../../core/stores/baseFormStore';
import { FamilyRegisterFormErrors } from '../stores/familyRegisterFormStore';

export type SetFamilyDisplayIdError = SetFormError;
export type SetFamilyNameError = SetFormError;
export type SetFamilyOnlineNameError = SetFormError;
export type SetParentNameError = SetFormError;
export type SetParentBirthdayError = SetFormError;

/**
 * バリデーション結果
 */
export interface ValidationResult {
  /** バリデーション成功フラグ */
  isValid: boolean;
}

/** 家族登録フォームのバリデーションハンドラー
 * 
 * フォームの入力内容をバリデーションし、エラーメッセージを設定する */
export const useFamilyRegisterFormValidator = (params: {
  /** 家族登録フォームデータ */
  familyRegisterForm: FamilyRegisterForm;
  /** 現在の言語設定 */
  currentLanguageType: LanguageTypeValue;
  /** エラーをクリア */
  clearErrors: ClearErrors;
  /** 家族表示IDエラーを設定 */
  setFamilyDisplayIdError: SetFamilyDisplayIdError;
  /** 家族名エラーを設定 */
  setFamilyNameError: SetFamilyNameError;
  /** 家族オンライン名エラーを設定 */
  setFamilyOnlineNameError: SetFamilyOnlineNameError;
  /** 親名エラーを設定 */
  setParentNameError: SetParentNameError;
  /** 親誕生日エラーを設定 */
  setParentBirthdayError: SetParentBirthdayError;
}) => {
  return useCallback((): ValidationResult => {
    // エラーをクリア
    params.clearErrors();

    let hasValidationError = false;

    // 家族表示IDのバリデーション
    if (!params.familyRegisterForm.family.displayId.isValid) {
      params.setFamilyDisplayIdError(
        params.familyRegisterForm.family.displayId.errorMessage?.getMessage(params.currentLanguageType) || '家族IDが無効です'
      );
      hasValidationError = true;
    }

    // 家族名のバリデーション
    if (!params.familyRegisterForm.family.name.isValid) {
      params.setFamilyNameError(
        params.familyRegisterForm.family.name.errorMessage?.getMessage(params.currentLanguageType) || '家族名が無効です'
      );
      hasValidationError = true;
    }

    // 家族オンライン名のバリデーション
    if (!params.familyRegisterForm.family.onlineName.isValid) {
      params.setFamilyOnlineNameError(
        params.familyRegisterForm.family.onlineName.errorMessage?.getMessage(params.currentLanguageType) || 'オンライン家族名が無効です'
      );
      hasValidationError = true;
    }

    // 親名のバリデーション
    if (!params.familyRegisterForm.parent.name.isValid) {
      params.setParentNameError(
        params.familyRegisterForm.parent.name.errorMessage?.getMessage(params.currentLanguageType) || '親の名前が無効です'
      );
      hasValidationError = true;
    }

    // 親誕生日のバリデーション
    if (!params.familyRegisterForm.parent.birthday.isValid) {
      params.setParentBirthdayError(
        params.familyRegisterForm.parent.birthday.errorMessage?.getMessage(params.currentLanguageType) || '誕生日が無効です'
      );
      hasValidationError = true;
    }

    return {
      isValid: !hasValidationError
    };
  }, [
    params.familyRegisterForm,
    params.currentLanguageType,
    params.clearErrors,
    params.setFamilyDisplayIdError,
    params.setFamilyNameError,
    params.setFamilyOnlineNameError,
    params.setParentNameError,
    params.setParentBirthdayError
  ]);
};
