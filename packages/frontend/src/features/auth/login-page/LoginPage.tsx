import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { AppIcon } from './components/AppIcon';
import { AppTitleLabel } from './components/AppTitleLabel';
import { EmailInput } from '../../shared/components/EmailInput';
import { PasswordInputField } from '../../shared/components/PasswordInput';
import { LoginButton } from './components/LoginButton';
import { RegisterUserButton } from './components/RegisterUserButton';
import { ForgotPasswordLink } from './components/ForgotPasswordLink';
import { TermsOfServiceLink } from './components/TermsOfServiceLink';
import { LoadingPage } from '../../shared/loading-page/LoadingPage';
import { useTheme } from '@/core/theme';
import { useLoginFormStore } from './stores/loginFormStore';
import { createLoginPageHandlers } from './hooks/createloginPageHandlers';
import { useLoadToken, useSessionStore } from '../../../core/constants/sessionStore';
import { useState } from 'react';
import { JwtStorage } from '../services/jwtStorage';

/** ログインページ
 * 
 * ログイン機能全体を統合管理するメインページ */
export const LoginPage: React.FC = () => {
  const { colors } = useTheme();
  const formStore = useLoginFormStore();
  const sessionStore = useSessionStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  // JWTトークンのロード
  useLoadToken({setLoading});

  // 統合フックで全ハンドラーを取得
  const {
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleUserCreate,
    handleForgotPassword,
    handleTermsOfService,
  } = createLoginPageHandlers({
    formStore,
    sessionStore,
    setJwtToken: JwtStorage.setToken,
    setLoading
  });

  // JWT読み込み中はローディング画面を表示
  if (isLoading) return <LoadingPage message="認証情報を読み込んでいます..." />;

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
          <EmailInput
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
            loading={isLoading}
            onPress={handleLogin}
          />
          
          {/* 新規ユーザー作成ボタン */}
          <RegisterUserButton
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
