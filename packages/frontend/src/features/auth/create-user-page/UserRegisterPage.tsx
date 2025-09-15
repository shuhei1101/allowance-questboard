import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { EmailInputWithTitle } from '../../shared/components/EmailInputWithTitle';
import { PasswordInputWithTitle } from '../../shared/components/PasswordInputWithTitle';
import { ComfirmButton } from '../../shared/components/ComfirmButton';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useAppNavigation } from '../../../../AppNavigator';
import { useUserRegisterPageStore } from './stores/userRegisterPageStore';
import { useUserRegisterFormStore } from './stores/userRegisterFormStore';
import { userRegisterRegisterPageHandlers } from './hooks/createUserRegisterPageHandlers';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { useLoginFormStore } from '../login-page/stores/loginFormStore';

/** 新規登録画面
 *
 * 新規ユーザー登録機能を提供するメインページ */
export const UserRegisterPage: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const pageStore = useUserRegisterPageStore();
  const formStore = useUserRegisterFormStore();
  const loginFormStore = useLoginFormStore();
  const sessionStore = useSessionStore();
  const navigation = useAppNavigation();

  // 画面描画後
  useEffect(() => {
    pageStore.reset();
    formStore.reset();
  }, []);
  
  // 統合フックで全ハンドラを取得
  const {
    handleEmailChange,
    handlePasswordChange,
    handleUserRegister,
    handleBeforeRemove,
  } = userRegisterRegisterPageHandlers({
    formStore,
    pageStore,
    sessionStore,
    loginFormStore
  });
  
  
  // 戻るボタンのインターセプト設定
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', handleBeforeRemove);
    return unsubscribe;
  }, [navigation, handleBeforeRemove]);
  
  useLayoutEffect(() => {
    // ヘッダーボタンを設定
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
          onPress={handleUserRegister}
          disabled={!formStore.form.isValid}
          loading={pageStore.isLoading}
          variant="header"
        />
      ),
    });
  }, [navigation, handleUserRegister, pageStore.isLoading, formStore.form.isValid]);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background.primary }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* フォームコンテナ */}
      <View style={styles.formContainer}>
        {/* Email入力フィールド */}
        <EmailInputWithTitle
          value={formStore.form.email.value}
          onChange={handleEmailChange}
          error={formStore.errors.email}
          placeholder={t('auth.userRegister.emailPlaceholder')}
        />
        
        {/* Password入力フィールド */}
        <PasswordInputWithTitle
          value={formStore.form.password.value}
          onChange={handlePasswordChange}
          error={formStore.errors.password}
          placeholder={t('auth.userRegister.passwordPlaceholder')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30,
  },
  formContainer: {
    gap: 1,
  },
});
