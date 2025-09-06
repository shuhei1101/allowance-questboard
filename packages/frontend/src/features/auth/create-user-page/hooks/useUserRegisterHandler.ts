import { useCallback } from 'react';
import { Alert } from 'react-native';
import { supabase } from '@/core/supabase/supabase';
import { UserRegisterForm } from '../models/userRegisterForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { useUserCreateFormValidationHandler } from '../validations/useUserCreateFormValidationHandler';
import { ClearErrors, SetFormError } from '../../../../core/stores/baseFormStore';
import { SetLoading } from '../../../../core/stores/basePageStore';

export type UseUserRegisterHandler = (params: {
  userRegisterForm: UserRegisterForm,
  currentLanguageType: LanguageTypeValue,
  clearErrors: ClearErrors,
  setEmailError: SetFormError,
  setPasswordError: SetFormError,
  setLoading: SetLoading
}) => () => Promise<void>;

/** 新規登録ハンドラーのカスタムフック
 *
 * Supabaseの認証を実行し、成功時はメール認証画面へ遷移 */
export const useUserRegisterHandler: UseUserRegisterHandler = (params) => {
  // バリデーションハンドラーを取得
  const validateUserCreateForm = useUserCreateFormValidationHandler({
    userCreateForm: params.userRegisterForm,
    currentLanguageType: params.currentLanguageType,
    clearErrors: params.clearErrors,
    setEmailError: params.setEmailError,
    setPasswordError: params.setPasswordError
  });

  return useCallback(async (): Promise<void> => {
    // バリデーションチェック
    const validationResult = validateUserCreateForm();
    if (!validationResult.isValid) {
      return;
    }

    // ローディング状態を開始
    params.setLoading(true);

    try {
      // Supabaseで新規登録処理
      const { data, error } = await supabase.auth.signUp({
        email: params.userRegisterForm.email.value,
        password: params.userRegisterForm.password.value,
      });

      // デバッグログを追加
      console.log('Supabase signup response:', { data, error });

      // エラーが発生した場合は例外をスロー
      if (error) {
        console.error('Supabase signup error:', error);
        throw new AppError({
          errorType: 'SignUpError',
          message: AuthErrorMessages.signUpFailed(),
        });
      }

      // 成功時の処理
      if (data.user) {
        // メール確認が必要かどうかをチェック
        if (data.user.email_confirmed_at) {
          // メール確認済みの場合
          Alert.alert(
            '登録完了',
            'アカウントが正常に作成されました！',
            [{ text: 'OK' }]
          );
        } else {
          // メール確認が必要な場合
          Alert.alert(
            '登録完了',
            'メールアドレスに確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。',
            [{ text: 'OK' }]
          );
        }
      }

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert(
          '登録エラー',
          error.localeMessage.getMessage(params.currentLanguageType)
        );
      } else { 
        throw error; 
      }
      console.error('新規登録エラー:', error);
    } finally {
      // ローディング状態を終了
      params.setLoading(false);
    }
  }, [
    params.userRegisterForm,
    params.currentLanguageType,
    params.setLoading,
    validateUserCreateForm
  ]);
};
