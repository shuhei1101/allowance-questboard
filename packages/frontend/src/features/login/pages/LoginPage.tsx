import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { AppTitleLabel } from '../components/AppTitleLabel';
import { EmailInputField } from '../components/EmailInputField';
import { PasswordInputField } from '../components/PasswordInputField';
import { LoginButton } from '../components/LoginButton';
import { CreateFamilyButton } from '../components/CreateFamilyButton';
import { ForgotPasswordLink } from '../components/ForgotPasswordLink';
import { SelectFamilyDialog as SelectFamilyDialogComponent } from '../components/SelectFamilyDialog';
import { TermsOfServiceLink } from '../components/TermsOfServiceLink';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { login } from '../usecase/login';
import { useLoginPageStore } from '../store/loginPageStore';
import { useSessionStore } from '@/features/session/store/sessionStore';
import { LoginForm } from '../models/loginForm';
import { SelectFamilyDialog } from '../models/selectFamilyDialog';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';

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
  const handleEmailChange = (value: string) => {
    const updatedForm = new LoginForm({ 
      email: new Email(value), 
      password: pageStore.loginForm.password 
    });
    pageStore.updateLoginForm(updatedForm);
    // エラーをクリア
    if (pageStore.emailError) {
      pageStore.setEmailError(null);
    }
  };

  // パスワード変更時のハンドラー
  const handlePasswordChange = (value: string) => {
    const updatedForm = new LoginForm({ 
      email: pageStore.loginForm.email, 
      password: new Password(value) 
    });
    pageStore.updateLoginForm(updatedForm);
    // エラーをクリア
    if (pageStore.passwordError) {
      pageStore.setPasswordError(null);
    }
  };

  /**
   * ログイン処理
   * Supabaseの認証を実行し、成功時は家族選択ダイアログを表示
   */
  const handleLogin = useCallback(async () => {
    // エラーをクリア
    pageStore.clearErrors();

    // バリデーションチェック
    let hasValidationError = false;

    // メールアドレスのバリデーション
    if (!pageStore.loginForm.email.isValid) {
      pageStore.setEmailError(pageStore.loginForm.email.errorMessage?.ja || 'バリデーションエラー');
      hasValidationError = true;
    }

    // パスワードのバリデーション
    if (!pageStore.loginForm.password.isValid) {
      pageStore.setPasswordError(pageStore.loginForm.password.errorMessage?.ja || 'バリデーションエラー');
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
      //   email: store.loginForm.email,
      //   password: store.loginForm.password,
      // });

      // if (error) throw error;

      // 仮のJWTトークン（実際はSupabaseから取得）
      const mockJwtToken = 'mock-jwt-token';
      
      const result = await login({ jwtToken: mockJwtToken });
      
      if (result.success) {
        // 家族選択ダイアログを表示
        pageStore.updateSelectFamilyDialog(
          new SelectFamilyDialog({ familyName: pageStore.selectFamilyDialog.familyName })
        );
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
  }, [pageStore, t]);

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
      sessionStore.updateJwt('mock-jwt-token'); // 実際はログイン時に取得したトークン
      
      // TODO: 家族メンバータイプの設定（後で実装）
      // updateFamilyMemberType(parentType);

      // ダイアログを閉じる
      pageStore.hideDialog();
      
      // ログイン状態をリセット
      pageStore.updateLoginForm(LoginForm.initialize());
      pageStore.setLoading(false);

      // TODO: 親用ホーム画面への遷移
      console.log('親用ホーム画面への遷移');
      Alert.alert(t('common.success'), t('login.success.parentLogin'));
    } catch (error) {
      console.error('親ログインエラー:', error);
      Alert.alert(t('common.error'), t('login.errors.parentLoginFailed'));
    }
  }, [sessionStore, pageStore, t]);

  /**
   * 子供としてログイン
   */
  const handleChildLogin = useCallback(() => {
    try {
      // セッションにJWTトークンを設定
      sessionStore.updateJwt('mock-jwt-token'); // 実際はログイン時に取得したトークン
      
      // TODO: 家族メンバータイプの設定（後で実装）
      // updateFamilyMemberType(childType);

      // ダイアログを閉じる
      pageStore.hideDialog();
      
      // ログイン状態をリセット
      pageStore.updateLoginForm(LoginForm.initialize());
      pageStore.setLoading(false);

      // TODO: 子供用ホーム画面への遷移
      console.log('子供用ホーム画面への遷移');
      Alert.alert(t('common.success'), t('login.success.childLogin'));
    } catch (error) {
      console.error('子供ログインエラー:', error);
      Alert.alert(t('common.error'), t('login.errors.childLoginFailed'));
    }
  }, [sessionStore, pageStore, t]);

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
    pageStore.hideDialog();
  }, [pageStore]);

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
            onChange={handleEmailChange}
            error={pageStore.emailError || undefined}
          />
          
          <PasswordInputField
            value={pageStore.loginForm.password.value}
            onChange={handlePasswordChange}
            error={pageStore.passwordError || undefined}
          />
          
          <LoginButton
            disabled={!isFormFilled}
            loading={pageStore.isLoading}
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

      <SelectFamilyDialogComponent
        isVisible={isDialogVisible}
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
