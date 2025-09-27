import { useCallback } from 'react';
import { Alert } from 'react-native';
import { supabase } from '@/core/supabase/supabase';
import { LoginForm } from '../../models/loginForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { Login } from '../../services/login';
import { AppError } from '@backend/core/errors/appError';
import { useLoginFormValidationHandler } from '../../validations/useLoginFormValidationHandler';
import { CreateAuthenticatedClient } from '../../../../../core/api/trpcClient';
import { ClearErrors, SetFormError } from '../../../../../core/stores/baseFormStore';
import { SetJwtToken } from '../../../services/jwtStorage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackMeta, AuthStackParamList } from '../../../AuthNavigator';

/**
 * ログインハンドラーのカスタムフック
 * 
 * Supabaseの認証を実行し、ログイン処理を行う
 * 認証情報をセッションストアに保存する
 */
export const useLoginHandler = (params: {
  loginForm: LoginForm,
  currentLanguageType: LanguageTypeValue,
  clearErrors: ClearErrors,
  setEmailError: SetFormError,
  setPasswordError: SetFormError,
  setLoading: (loading: boolean) => void,
  login: Login,
  createAuthenticatedClient: CreateAuthenticatedClient,
  setJwtToken: SetJwtToken
}) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  // バリデーションハンドラーを取得
  const validateLoginForm = useLoginFormValidationHandler({
    loginForm: params.loginForm,
    currentLanguageType: params.currentLanguageType,
    clearErrors: params.clearErrors,
    setEmailError: params.setEmailError,
    setPasswordError: params.setPasswordError
  });

  return useCallback(async (): Promise<void> => {
    // バリデーションチェック
    const validationResult = validateLoginForm();
    if (!validationResult.isValid) {
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
        if (error.message === 'Email not confirmed') {
          throw new AppError({
            errorType: 'EmailNotConfirmed',
            message: AuthErrorMessages.emailNotConfirmed(),
          });
        }
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
      // JWTトークンをストアに保存
      params.setJwtToken(jwtToken);

      // ロール選択画面へ遷移
      navigation.navigate(AuthStackMeta.screens.roleSelect, {});

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
    params.setLoading,
    params.login,
    validateLoginForm,
    params.createAuthenticatedClient,
    navigation
  ]);
};
