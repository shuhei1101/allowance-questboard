import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { AppIcon } from './AppIcon';
import { AppTitleLabel } from './AppTitleLabel';
import { EmailInputField } from './EmailInputField';
import { PasswordInputField } from './PasswordInputField';
import { LoginButton } from './LoginButton';
import { CreateFamilyButton } from './CreateFamilyButton';
import { ForgotPasswordLink } from './ForgotPasswordLink';
import { SelectFamilyDialog } from './SelectFamilyDialog';
import { TermsOfServiceLink } from './TermsOfServiceLink';
import { useLoginFormState, useIsLoading, useIsDialogVisible } from '../hooks/loginPageHooks';
import { useLoginPageStore } from '../store/loginPageStore';
import { useTheme } from '@/core/theme';

interface LoginScreenProps {
  /** ログイン処理ハンドラー */
  handleLogin: () => void;
  /** 新規家族作成ハンドラー */
  handleCreateFamily: () => void;
  /** パスワード忘れハンドラー */
  handleForgotPassword: () => void;
  /** 親ログインハンドラー */
  handleParentLogin: () => void;
  /** 子供ログインハンドラー */
  handleChildLogin: () => void;
  /** 利用規約ハンドラー */
  handleTermsOfService: () => void;
  /** ダイアログを閉じるハンドラー */
  handleCloseDialog: () => void;
  /** 家族名（ダイアログ表示用） */
  familyName?: string | null;
}

/**
 * ログイン画面スクリーン
 * ログイン画面全体を管理するメインコンポーネント
 */
export const LoginScreen: React.FC<LoginScreenProps> = ({
  handleLogin,
  handleCreateFamily,
  handleForgotPassword,
  handleParentLogin,
  handleChildLogin,
  handleTermsOfService,
  handleCloseDialog,
  familyName,
}) => {
  // Hooks
  const { colors } = useTheme();
  const { isValid } = useLoginFormState();
  const isLoading = useIsLoading();
  const isDialogVisible = useIsDialogVisible();
  
  // Store actions
  const {
    loginForm,
    updateLoginForm,
  } = useLoginPageStore();

  // Form handlers
  const handleEmailChange = (value: string) => {
    updateLoginForm({ ...loginForm, email: value });
  };

  const handlePasswordChange = (value: string) => {
    updateLoginForm({ ...loginForm, password: value });
  };

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
            value={loginForm.email}
            onChange={handleEmailChange}
          />
          
          <PasswordInputField
            value={loginForm.password}
            onChange={handlePasswordChange}
          />
          
          <LoginButton
            disabled={!isValid}
            loading={isLoading}
            onPress={handleLogin}
          />
          
          <CreateFamilyButton
            onPress={handleCreateFamily}
          />
          
          <ForgotPasswordLink
            onPress={handleForgotPassword}
          />
        </View>

        <TermsOfServiceLink
          onPress={handleTermsOfService}
        />
      </ScrollView>

      <SelectFamilyDialog
        isVisible={isDialogVisible}
        familyName={familyName || undefined}
        onParentLogin={handleParentLogin}
        onChildLogin={handleChildLogin}
        onClose={handleCloseDialog}
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
