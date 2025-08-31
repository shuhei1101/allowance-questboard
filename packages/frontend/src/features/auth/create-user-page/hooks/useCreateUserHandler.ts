import { useCallback } from 'react';
import { Alert } from 'react-native';
import { ClearErrors, SetEmailError, SetPasswordError, SetLoading } from '../createUserPageStore';
import { supabase } from '@/core/supabase/supabase';
import { UserCreateForm } from '../models/userCreateForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { useUserCreateFormValidationHandler } from '../validations/useUserCreateFormValidationHandler';

export type UseCreateUserHandler = (params: {
  userCreateForm: UserCreateForm,
  currentLanguageType: LanguageTypeValue,
  clearErrors: ClearErrors,
  setEmailError: SetEmailError,
  setPasswordError: SetPasswordError,
  setLoading: SetLoading
}) => () => Promise<void>;

/** 新規登録ハンドラーのカスタムフック
 *
 * Supabaseの認証を実行し、成功時はメール認証画面へ遷移 */
export const useCreateUserHandler: UseCreateUserHandler = (params) => {
  // バリデーションハンドラーを取得
  const validateUserCreateForm = useUserCreateFormValidationHandler({
    userCreateForm: params.userCreateForm,
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
        email: params.userCreateForm.email.value,
        password: params.userCreateForm.password.value,
      });

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
        Alert.alert(
          '登録完了',
          'メールアドレスに確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。',
          [{ text: 'OK' }]
        );
        // TODO: メール認証画面への遷移処理を追加
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
    params.userCreateForm,
    params.currentLanguageType,
    params.setLoading,
    validateUserCreateForm
  ]);
};
