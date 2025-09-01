import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EmailInputFieldEntry } from '../../shared/components/EmailInputFieldEntry';
import { PasswordInputFieldEntry } from '../../shared/components/PasswordInputFieldEntry';
import { ComfirmButton } from '../../shared/components/ComfirmButton';
import { useTheme } from '@/core/theme';
import { createUserPageHandlers } from './hooks/createUserPageHandlers';
import { useCreateUserPageStore } from './createUserPageStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useAppNavigation } from '../../../../AppNavigator';

/** 新規登録画面
 *
 * 新規ユーザー登録機能を提供するメインページ */
export const CreateUserPage: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const pageStore = useCreateUserPageStore();
  const navigation = useAppNavigation();

  // ページ状態をリセット
  useLayoutEffect(() => {
    pageStore.reset();
  }, [pageStore]);

  // 統合フックで全ハンドラを取得
  const {
    handleEmailChange,
    handlePasswordChange,
    handleUserCreate,
  } = createUserPageHandlers();

  // ヘッダーボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
          onPress={handleUserCreate}
          disabled={!pageStore.userCreateForm.isValid}
          loading={pageStore.isLoading}
          variant="header"
        />
      ),
    });
  }, [navigation, handleUserCreate, pageStore.isLoading, pageStore.userCreateForm]);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background.primary }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* フォームコンテナ */}
      <View style={styles.formContainer}>
        {/* Email入力フィールド */}
        <EmailInputFieldEntry
          value={pageStore.userCreateForm.email.value}
          onChange={handleEmailChange}
          error={pageStore.errors.email}
          placeholder={t('auth.createUser.emailPlaceholder')}
        />
        
        {/* Password入力フィールド */}
        <PasswordInputFieldEntry
          value={pageStore.userCreateForm.password.value}
          onChange={handlePasswordChange}
          error={pageStore.errors.password}
          placeholder={t('auth.createUser.passwordPlaceholder')}
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
