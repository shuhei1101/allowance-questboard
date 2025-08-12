import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { LoginScreen } from '../components/LoginScreen';
import { useTheme } from '@frontend/core/theme';
import { useTranslation } from '@frontend/core/i18n/useTranslation';
import { login } from '../usecase/login';
import { 
  useIsFormValid,
  useSetLoading,
  useSetDialogVisible,
  useResetLoginState
} from '../hooks/loginPageHooks';
import { useLoginPageStore } from '../store/loginPageStore';
import { useSessionStore } from '@frontend/features/session';

/**
 * ログインページ
 * ログイン機能全体を統合管理するメインページ
 * 
 * 機能:
 * - メール・パスワード認証
 * - 新規家族作成への遷移
 * - パスワードリセットへの遷移  
 * - 親・子ログインの選択
 * - 利用規約への遷移
 */
export const LoginPage: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isFormValid = useIsFormValid();
  const setLoading = useSetLoading();
  const setDialogVisible = useSetDialogVisible();
  const resetLoginState = useResetLoginState();
  const { loginForm, selectFamilyDialog } = useLoginPageStore();
  
  // セッション管理
  const { updateJwt } = useSessionStore();

  /**
   * ログイン処理
   * Supabaseの認証を実行し、成功時は家族選択ダイアログを表示
   */
  const handleLogin = useCallback(async () => {
    if (!isFormValid) {
      Alert.alert(t('common.error'), t('login.errors.invalidCredentials'));
      return;
    }

    setLoading(true);

    try {
      // TODO: Supabaseの実装に置き換える
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: loginForm.email,
      //   password: loginForm.password,
      // });

      // if (error) throw error;

      // 仮のJWTトークン（実際はSupabaseから取得）
      const mockJwtToken = 'mock-jwt-token';
      
      const result = await login({ jwtToken: mockJwtToken });
      
      if (result.success) {
        // 家族選択ダイアログを表示
        setDialogVisible(true);
      } else {
        Alert.alert(t('common.error'), result.errorMessage || t('login.errors.loginFailed'));
      }
    } catch (error) {
      console.error('ログインエラー:', error);
      Alert.alert(t('common.error'), t('login.errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  }, [isFormValid, loginForm, setLoading, setDialogVisible, t]);

  /**
   * 新規家族作成画面への遷移
   */
  const handleCreateFamily = useCallback(() => {
    // TODO: React Navigationの実装
    console.log('新規家族作成画面への遷移');
    Alert.alert(t('common.confirm'), t('login.navigation.createFamily'));
  }, [t]);

  /**
   * パスワードリセット画面への遷移
   */
  const handleForgotPassword = useCallback(() => {
    // TODO: React Navigationの実装
    console.log('パスワードリセット画面への遷移');
    Alert.alert(t('common.confirm'), t('login.navigation.forgotPassword'));
  }, [t]);

  /**
   * 親としてログイン
   */
  const handleParentLogin = useCallback(() => {
    try {
      // セッションにJWTトークンを設定
      updateJwt('mock-jwt-token'); // 実際はログイン時に取得したトークン
      
      // TODO: 家族メンバータイプの設定（後で実装）
      // updateFamilyMemberType(parentType);

      // ダイアログを閉じる
      setDialogVisible(false);
      
      // ログイン状態をリセット
      resetLoginState();

      // TODO: 親用ホーム画面への遷移
      console.log('親用ホーム画面への遷移');
      Alert.alert(t('common.success'), t('login.success.parentLogin'));
    } catch (error) {
      console.error('親ログインエラー:', error);
      Alert.alert(t('common.error'), t('login.errors.parentLoginFailed'));
    }
  }, [updateJwt, setDialogVisible, resetLoginState, t]);

  /**
   * 子供としてログイン
   */
  const handleChildLogin = useCallback(() => {
    try {
      // セッションにJWTトークンを設定
      updateJwt('mock-jwt-token'); // 実際はログイン時に取得したトークン
      
      // TODO: 家族メンバータイプの設定（後で実装）
      // updateFamilyMemberType(childType);

      // ダイアログを閉じる
      setDialogVisible(false);
      
      // ログイン状態をリセット
      resetLoginState();

      // TODO: 子供用ホーム画面への遷移
      console.log('子供用ホーム画面への遷移');
      Alert.alert(t('common.success'), t('login.success.childLogin'));
    } catch (error) {
      console.error('子供ログインエラー:', error);
      Alert.alert(t('common.error'), t('login.errors.childLoginFailed'));
    }
  }, [updateJwt, setDialogVisible, resetLoginState, t]);

  /**
   * 利用規約画面への遷移
   */
  const handleTermsOfService = useCallback(() => {
    // TODO: React Navigationの実装
    console.log('利用規約画面への遷移');
    Alert.alert(t('common.confirm'), t('login.navigation.termsOfService'));
  }, [t]);

  /**
   * ダイアログを閉じる
   */
  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
  }, [setDialogVisible]);

  // ページ固有のメソッド群
  const pageHandlers = {
    handleLogin,
    handleCreateFamily,
    handleForgotPassword,
    handleParentLogin,
    handleChildLogin,
    handleTermsOfService,
    handleCloseDialog,
  };

  return (
    <LoginScreen 
      {...pageHandlers}
      familyName={selectFamilyDialog.familyName}
    />
  );
};
