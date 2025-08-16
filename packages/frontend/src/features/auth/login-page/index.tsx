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
import { useLoginPageStore } from './stores/loginPageStore';
import { handleEmailChange } from './handlers/handleEmailChange';
import { handlePasswordChange } from './handlers/handlePasswordChange';
import { handleLogin } from './handlers/handleLogin';
import { handleCreateFamily } from './handlers/handleCreateFamily';
import { handleForgotPassword } from './handlers/handleForgotPassword';
import { handleParentLogin } from './handlers/handleParentLogin';
import { handleChildLogin } from './handlers/handleChildLogin';
import { handleTermsOfService } from './handlers/handleTermsOfService';
import { handleCloseDialog } from './handlers/handleCloseDialog';

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
  const pageStore = useLoginPageStore();
  
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
            value={pageStore.loginForm.email.value}
            onChange={handleEmailChange}
            error={pageStore.emailError || undefined}
          />
          
          {/* Password入力フィールド */}
          <PasswordInputField
            value={pageStore.loginForm.password.value}
            onChange={handlePasswordChange}
            error={pageStore.passwordError || undefined}
          />
          
          {/* ログインボタン */}
          <LoginButton
            disabled={!pageStore.loginForm.isFilled()}
            loading={pageStore.isLoading}
            onPress={handleLogin}
          />
          
          {/* 新規家族作成ボタン */}
          <CreateFamilyButton
            onPress={handleCreateFamily}
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
