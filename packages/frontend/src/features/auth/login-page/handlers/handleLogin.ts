import { Alert } from 'react-native';
import { useLoginPageStore } from '../stores/loginPageStore';
import { useSessionStore } from '@/features/auth/shared/stores/sessionStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { login } from '../services/login';

/**
 * ログインハンドラー
 * 
 * Supabaseの認証を実行し、成功時は家族選択ダイアログを表示
 */
export const handleLogin = async (): Promise<void> => {
  const pageStore = useLoginPageStore();
  const sessionStore = useSessionStore();
  const { t } = useTranslation();
  
  // エラーをクリア
  pageStore.clearErrors();

  // バリデーションチェック
  let hasValidationError = false;

  // メールアドレスのバリデーション
  if (!pageStore.loginForm.email.isValid) {
    pageStore.setEmailError(pageStore.loginForm.email.errorMessage?.getMessage(sessionStore.languageType) || 'バリデーションエラー');
    hasValidationError = true;
  }

  // パスワードのバリデーション
  if (!pageStore.loginForm.password.isValid) {
    pageStore.setPasswordError(pageStore.loginForm.password.errorMessage?.getMessage(sessionStore.languageType) || 'バリデーションエラー');
    hasValidationError = true;
  }

  // バリデーションエラーがある場合は処理を終了
  if (hasValidationError) {
    return;
  }

  pageStore.setLoading(true);

  try {
    // TODO: Supabaseの実装に置き換える
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: pageStore.loginForm.email,
    //   password: pageStore.loginForm.password,
    // });

    // if (error) throw error;

    // 仮のJWTトークン（実際はSupabaseから取得）
    const mockJwtToken = 'mock-jwt-token';
    
    const result = await login({ jwtToken: mockJwtToken });
    
    if (result.success) {
      pageStore.showDialog();
    } else {
      Alert.alert(t('common.error'), result.errorMessage || t('login.errors.loginFailed'));
    }
  } catch (error) {
    console.error('ログインエラー:', error);
    Alert.alert(t('common.error'), t('login.errors.loginFailed'));
  } finally {
    pageStore.setLoading(false);
  }
};
