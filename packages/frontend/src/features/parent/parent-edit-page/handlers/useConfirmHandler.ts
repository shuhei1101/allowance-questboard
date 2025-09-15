import { useCallback } from 'react';
import { SetLoading, ClearErrors, SetNameError, SetEmailError, SetPasswordError, SetBirthdayError } from '../stores/parentEditPageStore';
import { ParentForm } from '../models/parentForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { useParentFormValidationHandler as useParentFormValidationHandler } from './useParentFormValidationHandler';
import { HandleParentForm } from '../ParentEditPage';
import { useAppNavigation } from '../../../../../AppNavigator';

/** 確定ボタン押下ハンドラーのカスタムフック
 * 親情報の登録を実行する */
export const useConfirmHandler = (params: {
  parentForm: ParentForm,
  currentLanguageType: LanguageTypeValue,
  setLoading: SetLoading,
  clearErrors: ClearErrors,
  setNameError: SetNameError,
  setEmailError: SetEmailError,
  setPasswordError: SetPasswordError,
  setBirthdayError: SetBirthdayError,
  shouldUpdate?: boolean,
  handleParentForm?: HandleParentForm
  
}) => {
  const navigation = useAppNavigation();
  // バリデーションハンドラーを取得
  const validateParentForm = useParentFormValidationHandler({
    parentForm: params.parentForm,
    currentLanguageType: params.currentLanguageType,
    clearErrors: params.clearErrors,
    setNameError: params.setNameError,
    setEmailError: params.setEmailError,
    setPasswordError: params.setPasswordError,
    setBirthdayError: params.setBirthdayError
  });

  return useCallback(async (): Promise<void> => {
    try {
      // バリデーションチェック
      const validationResult = validateParentForm();
      if (!validationResult.isValid) {
        return; // バリデーションエラーの場合は処理を終了
      }

      params.setLoading(true);

      // shouldUpdateがtrueの場合のみ更新クエリを送信
      if (params.shouldUpdate !== false) {
        // 親情報の登録API呼び出し（今後実装予定）
        // await registerParent(params.parentForm);

      }

      // 親情報登録後の処理
      if (params.handleParentForm) {
        params.handleParentForm(params.parentForm);
      }
      // 前画面に遷移する
      navigation.goBack();
    } catch (error: any) {
      // API呼び出し時のエラー処理
      console.error('親情報登録エラー:', error);
      
      // TODO: API関連のエラーメッセージ表示処理を実装予定
    } finally {
      params.setLoading(false);
    }
  }, [
    params.parentForm,
    params.currentLanguageType,
    params.setLoading,
    params.clearErrors,
    params.setNameError,
    params.setEmailError,
    params.setPasswordError,
    params.setBirthdayError,
    params.shouldUpdate,
    validateParentForm
  ]);
};
