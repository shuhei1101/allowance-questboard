import { useCallback } from 'react';
import { Alert } from 'react-native';
import { ClearErrors, SetEmailError, SetPasswordError, SetLoading, ShowDialog, SetSelectFamilyDialog } from '../stores/loginPageStore';
import { supabase } from '@/core/supabase/supabase';
import { LoginForm } from '../models/loginForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { Login } from '../services/login';
import { LoginRouter } from '@backend/features/auth/router/loginRouter';
import { AppError } from '@backend/core/errors/appError';

/**
 * ログインハンドラーのカスタムフック
 * 
 * Supabaseの認証を実行し、成功時は家族選択ダイアログを表示
 */
export const useLoginHandler = (params: {
  loginForm: LoginForm,
  currentLanguageType: LanguageTypeValue,
  clearErrors: ClearErrors,
  setEmailError: SetEmailError,
  setPasswordError: SetPasswordError,
  setLoading: SetLoading,
  showDialog: ShowDialog,
  login: Login,
  setSelectFamilyDialog: SetSelectFamilyDialog,
  loginRouter: LoginRouter
}) => {
  return useCallback(async (): Promise<void> => {
    // エラーをクリア
    params.clearErrors();

    // バリデーションチェック
    let hasValidationError = false;

    // メールアドレスのバリデーション
    if (!params.loginForm.email.isValid) {
      params.setEmailError(params.loginForm.email.errorMessage.getMessage(params.currentLanguageType));
      hasValidationError = true;
    }

    // パスワードのバリデーション
    if (!params.loginForm.password.isValid) {
      params.setPasswordError(params.loginForm.password.errorMessage.getMessage(params.currentLanguageType));
      hasValidationError = true;
    }

    // バリデーションエラーがある場合は処理を終了
    if (hasValidationError) {
      return;
    }

    // ローディング状態を開始
    params.setLoading(true);

    try {
      // Supabaseでログイン処理
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.loginForm.email.value,
        password: params.loginForm.password.value,
      });
      // エラーが発生した場合は例外をスロー
      if (error) {
        console.error('Supabase login error:', error);
        throw new AppError({
          errorType: 'LoginError',
          message: AuthErrorMessages.loginFailed(),
        });
      }

      // JWTトークンを取得
      const jwtToken = data.session?.access_token;
      if (!jwtToken) {
        throw new AppError({
          errorType: 'LoginError',
          message: AuthErrorMessages.tokenRetrievalFailed(),
        });
      }
      
      // jwtを元にアプリにログイン
      await params.login({
        setSelectFamilyDialog: params.setSelectFamilyDialog,
        router: params.loginRouter
      });

      // ダイアログの表示
      params.showDialog();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert(
          AuthErrorMessages.loginErrorTitle().getMessage(params.currentLanguageType),
          error.localeMessage.getMessage(params.currentLanguageType));
      } else { throw error; }
      console.error('ログインエラー:', error);
    } finally {
      // ローディング状態を終了
      params.setLoading(false);
    }
  }, [
    params.loginForm,
    params.currentLanguageType,
    params.clearErrors,
    params.setEmailError,
    params.setPasswordError,
    params.setLoading,
    params.showDialog
  ]);
};
