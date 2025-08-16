import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { AppIcon } from './components/AppIcon';
import { AppTitleLabel } from './components/AppTitleLabel';
import { EmailInputField } from './components/EmailInputField';
import { PasswordInputField } from './components/PasswordInputField';
import { LoginButton } from './components/LoginButton';
import { CreateFamilyButton } from './components/CreateFamilyButton';
import { ForgotPasswordLink } from './components/ForgotPasswordLink';
import { SelectFamilyDialog as SelectFamilyDialogComponent } from './components/SelectFamilyDialog';
import { TermsOfServiceLink } from './components/TermsOfServiceLink';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useLoginPageStore } from './stores/loginPageStore';
import { useSessionStore } from '@/features/auth/shared/stores/sessionStore';
import { handleEmailChange } from './services/handleEmailChange';
import { handlePasswordChange } from './services/handlePasswordChange';
import { handleLogin } from './services/handleLogin';
import { handleCreateFamily } from './services/handleCreateFamily';
import { handleForgotPassword } from './services/handleForgotPassword';
import { handleParentLogin } from './services/handleParentLogin';
import { handleChildLogin } from './services/handleChildLogin';
import { handleTermsOfService } from './services/handleTermsOfService';
import { handleCloseDialog } from './services/handleCloseDialog';

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
  // Hooks
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  // Store
  const pageStore = useLoginPageStore();
  const sessionStore = useSessionStore();

  // ダイアログの表示状態
  const isDialogVisible = pageStore.isDialogVisible;

  // フォームの有効性を計算
  const isFormValid = pageStore.loginForm.isValid();
  // フォームが入力済みかどうか
  const isFormFilled = pageStore.loginForm.isFilled();
  
  // メール変更時のハンドラー
  const onEmailChange = (value: string) => {
    handleEmailChange({ value });
  };

  // パスワード変更時のハンドラー
  const onPasswordChange = (value: string) => {
    handlePasswordChange({ value });
  };

  /**
   * ログイン処理
   */
  const onLogin = useCallback(async () => {
    await handleLogin();
  }, []);

  /**
   * 新規家族作成画面への遷移
   */
  const onCreateFamily = useCallback(() => {
    handleCreateFamily();
  }, []);

  /**
   * パスワードリセット画面への遷移
   */
  const onForgotPassword = useCallback(() => {
    handleForgotPassword();
  }, []);

  /**
   * 親としてログイン
   */
  const onParentLogin = useCallback(() => {
    handleParentLogin();
  }, []);

  /**
   * 子供としてログイン
   */
  const onChildLogin = useCallback(() => {
    handleChildLogin();
  }, []);

  /**
   * 利用規約画面への遷移
   */
  const onTermsOfService = useCallback(() => {
    handleTermsOfService();
  }, []);

  /**
   * ダイアログを閉じる
   */
  const onCloseDialog = useCallback(() => {
    handleCloseDialog();
  }, []);

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background.primary }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <AppIcon />
          <AppTitleLabel />
        </View>

        <View style={styles.formContainer}>
          <EmailInputField
            value={pageStore.loginForm.email.value}
            onChange={onEmailChange}
            error={pageStore.emailError || undefined}
          />
          
          <PasswordInputField
            value={pageStore.loginForm.password.value}
            onChange={onPasswordChange}
            error={pageStore.passwordError || undefined}
          />
          
          <LoginButton
            disabled={!isFormFilled}
            loading={pageStore.isLoading}
            onPress={onLogin}
          />
          
          <CreateFamilyButton
            onPress={onCreateFamily}
          />
          
          <ForgotPasswordLink
            onPress={onForgotPassword}
          />
        </View>

        <TermsOfServiceLink
          onPress={onTermsOfService}
        />
      </ScrollView>

      <SelectFamilyDialogComponent
        isVisible={isDialogVisible}
        familyName={pageStore.selectFamilyDialog.getFamilyNameString() || undefined}
        onParentLogin={onParentLogin}
        onChildLogin={onChildLogin}
        onClose={onCloseDialog}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 40,
  },
});
