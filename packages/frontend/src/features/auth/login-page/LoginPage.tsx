import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { AppIcon } from './components/AppIcon';
import { AppTitleLabel } from './components/AppTitleLabel';
import { EmailInputField } from '../../shared/components/EmailInputField';
import { PasswordInputField } from '../../shared/components/PasswordInputField';
import { LoginButton } from './components/LoginButton';
import { CreateUserButton } from './components/CreateUserButton';
import { ForgotPasswordLink } from './components/ForgotPasswordLink';
import { SelectFamilyDialog as SelectFamilyDialogComponent } from './components/SelectFamilyDialog';
import { TermsOfServiceLink } from './components/TermsOfServiceLink';
import { useTheme } from '@/core/theme';
import { loginPageHandlers } from './hooks/loginPageHandlers';
import { useRef } from 'react';
import { createLoginPageStore } from './loginPageStore';
import { createLoginFormStore } from './loginFormStore';

/** ログインページ
 * 
 * ログイン機能全体を統合管理するメインページ */
export const LoginPage: React.FC = () => {
  const { colors } = useTheme();
  const formStore = useRef(createLoginFormStore()).current();
  const pageStore = useRef(createLoginPageStore()).current();

  // 統合フックで全ハンドラーを取得
  const {
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleUserCreate,
    handleForgotPassword,
    handleParentLogin,
    handleChildLogin,
    handleTermsOfService,
    handleCloseDialog,
  } = loginPageHandlers();

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background.primary }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* スクロールビュー */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* ヘッダーコンテナ */}
        <View style={styles.headerContainer}>
          {/* アプリアイコン */}
          <AppIcon />
          {/* アプリタイトルラベル */}
          <AppTitleLabel />
        </View>

        {/* フォームコンテナ */}
        <View style={styles.formContainer}>
          {/* Email入力フィールド */}
          <EmailInputField
            value={formStore.form.email.value}
            onChange={handleEmailChange}
            error={formStore.errors.email || undefined}
          />
          
          {/* Password入力フィールド */}
          <PasswordInputField
            value={formStore.form.password.value}
            onChange={handlePasswordChange}
            error={formStore.errors.password || undefined}
          />
          
          {/* ログインボタン */}
          <LoginButton
            disabled={!formStore.form.isValid}
            loading={pageStore.isLoading}
            onPress={handleLogin}
          />
          
          {/* 新規ユーザー作成ボタン */}
          <CreateUserButton
            onPress={handleUserCreate}
          />
          
          {/* パスワードリセットリンク */}
          <ForgotPasswordLink
            onPress={handleForgotPassword}
          />
        </View>

        {/* 利用規約リンク */}
        <TermsOfServiceLink
          onPress={handleTermsOfService}
        />
      </ScrollView>

      {/* 家族選択ダイアログ */}
      <SelectFamilyDialogComponent
        isVisible={pageStore.isDialogVisible}
        familyName={pageStore.selectFamilyDialog.getFamilyNameString() || undefined}
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
