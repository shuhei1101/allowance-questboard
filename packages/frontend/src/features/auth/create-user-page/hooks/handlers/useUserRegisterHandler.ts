import { useCallback } from 'react';
import { Alert } from 'react-native';
import { supabase } from '@/core/supabase/supabase';
import { UserRegisterForm } from '../../models/userRegisterForm';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { useUserCreateFormValidationHandler } from '../../validations/useUserCreateFormValidationHandler';
import { ClearErrors, SetForm, SetFormError } from '../../../../../core/stores/baseFormStore';
import { useAppNavigation } from '../../../../../../AppNavigator';
import { AuthStackMeta } from '../../../AuthNavigator';
import { LoginForm } from '../../../login-page/models/loginForm';

export type UseUserRegisterHandler = (params: {
  userRegisterForm: UserRegisterForm,
  currentLanguageType: LanguageTypeValue,
  clearErrors: ClearErrors,
  setEmailError: SetFormError,
  setPasswordError: SetFormError,
  setLoading: (loading: boolean) => void,
  setLoginForm: SetForm<LoginForm>
}) => () => Promise<void>;

/** 新規登録ハンドラーのカスタムフック
 *
 * Supabaseの認証を実行し、成功時はメール認証画面へ遷移 */
export const useUserRegisterHandler: UseUserRegisterHandler = (params) => {
  const navigation = useAppNavigation();
  
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

      // エラーが発生した場合の処理
      if (error) {
        console.error('Supabase signup error:', error);
        
        // 既存ユーザーのエラーかどうかをチェック
        if (error.message.includes('User already registered') || 
            error.message.includes('already been registered') ||
            error.code === 'email_taken' ||
            error.code === 'user_already_exists') {
          // 既存ユーザーの場合は情報メッセージを表示
          Alert.alert(
            '登録済みメールアドレス',
            AuthErrorMessages.emailAlreadyExists().getMessage(params.currentLanguageType),
            [{ text: 'OK' }]
          );
          return; // 処理を終了
        }
        
        // その他のエラーの場合はエラーとして扱う
        throw new AppError({
          errorType: 'SignUpError',
          message: AuthErrorMessages.signUpFailed(),
        });
      }

      // 成功時の処理
      if (data.user) {
        // メール確認が必要かどうかをチェック
        if (data.user.email_confirmed_at) {
          // メール確認済みの場合（通常は発生しない）
          Alert.alert(
            '登録完了',
            'アカウントが正常に作成されました！',
            [{ text: 'OK' }]
          );
        } else {
          // メール確認が必要な場合（通常のフロー）
          console.log('新規登録成功、メール認証画面へ遷移:', params.userRegisterForm.email.value);

          // メールを確認するよう促す
          Alert.alert(
            '登録完了',
            '登録が完了しました。確認メールを送信しましたので、メール内のリンクをクリックしてアカウントを有効化してください。',
            [{ text: 'OK' }]
          );

          // 前画面にメールアドレスとパスワードを渡す
          params.setLoginForm(new LoginForm({
            email: params.userRegisterForm.email,
            password: params.userRegisterForm.password,
          }));
          
          // 前の画面に戻る（ログイン画面へ）
          navigation.navigate(AuthStackMeta.name, {
            screen: AuthStackMeta.screens.login,
          });
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
    validateUserCreateForm,
    navigation
  ]);
};
