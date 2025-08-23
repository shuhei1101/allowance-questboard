import { useCallback } from 'react';
import { SetLoading, ClearErrors, SetNameError, SetEmailError, SetPasswordError, SetBirthdayError } from '../stores/parentEditPageStore';
import { ParentForm } from '../models/parentForm';
import { AppError } from '@backend/core/errors/appError';
import { LocaleString } from '@backend/core/messages/localeString';

/**
 * 確定ボタン押下ハンドラーのカスタムフック
 * 
 * 親情報の登録を実行する
 */
export const useConfirmHandler = (params: {
  parentForm: ParentForm,
  setLoading: SetLoading,
  clearErrors: ClearErrors,
  setNameError: SetNameError,
  setEmailError: SetEmailError,
  setPasswordError: SetPasswordError,
  setBirthdayError: SetBirthdayError,
  shouldUpdate?: boolean
}) => {
  return useCallback(async (): Promise<void> => {
    try {
      // バリデーション実行
      if (!params.parentForm.isValid) {
        throw new AppError({
          errorType: 'VALIDATION_ERROR',
          message: new LocaleString({
            ja: '入力に誤りがあります。各項目を確認してください。',
            en: 'There are errors in the input. Please check each item.'
          })
        });
      }

      params.setLoading(true);
      params.clearErrors();

      // shouldUpdateがtrueの場合のみ更新クエリを送信
      if (params.shouldUpdate !== false) {
        // 親情報の登録API呼び出し（今後実装予定）
        // await registerParent(params.parentForm);
      }
    } catch (error: any) {
      // エラー時の処理
      console.error('親情報登録エラー:', error);
      
      // 各フィールドのエラーメッセージ設定（今後詳細化予定）
      if (error.message.includes('名前')) {
        params.setNameError(error.message);
      }
      if (error.message.includes('メール')) {
        params.setEmailError(error.message);
      }
      if (error.message.includes('パスワード')) {
        params.setPasswordError(error.message);
      }
      if (error.message.includes('誕生日')) {
        params.setBirthdayError(error.message);
      }
    } finally {
      params.setLoading(false);
    }
  }, [
    params.parentForm,
    params.setLoading,
    params.clearErrors,
    params.setNameError,
    params.setEmailError,
    params.setPasswordError,
    params.setBirthdayError,
    params.shouldUpdate
  ]);
};
