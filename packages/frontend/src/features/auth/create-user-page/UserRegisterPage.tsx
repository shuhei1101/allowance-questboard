import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ComfirmButton } from '../../shared/components/ComfirmButton';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useAppNavigation } from '../../../../AppNavigator';
import { useUserRegisterFormStore } from './stores/userRegisterFormStore';
import { userRegisterRegisterPageHandlers } from './hooks/createUserRegisterPageHandlers';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { useLoginFormStore } from '../login-page/stores/loginFormStore';
import { EmailInputEntry } from '../../shared/components/EmailInputEntry';
import { PasswordInputEntry } from '../../shared/components/PasswordInputEntry';

/** 新規登録画面
 *
 * 新規ユーザー登録機能を提供するメインページ */
export const UserRegisterPage: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const formStore = useUserRegisterFormStore();
  const loginFormStore = useLoginFormStore();
  const sessionStore = useSessionStore();
  const navigation = useAppNavigation();
  const [isLoading, setLoading] = useState<boolean>(false);

  // 画面描画後
  useEffect(() => {
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
    sessionStore,
    loginFormStore,
    setLoading
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
          loading={isLoading}
          variant="header"
        />
      ),
    });
  }, [navigation, handleUserRegister, isLoading, formStore.form.isValid]);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background.primary }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* フォームコンテナ */}
      <View style={styles.formContainer}>
        {/* Email入力フィールド */}
        <EmailInputEntry
          value={formStore.form.email}
          onChange={handleEmailChange}
          error={formStore.errors.email}
          placeholder={t('auth.userRegister.emailPlaceholder')}
        />
        
        {/* Password入力フィールド */}
        <PasswordInputEntry
          value={formStore.form.password}
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
