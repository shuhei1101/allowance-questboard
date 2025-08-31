import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmailInputFieldEntry } from '../../shared/components/EmailInputFieldEntry';
import { PasswordInputFieldEntry } from '../../shared/components/PasswordInputFieldEntry';
import { useTheme } from '@/core/theme';
import { createUserPageHandlers } from './hooks/createUserPageHandlers';
import { useCreateUserPageStore } from './createUserPageStore';
import { useTranslation } from '@/core/i18n/useTranslation';

/** 新規登録画面
 *
 * 新規ユーザー登録機能を提供するメインページ
 * 
 * 機能:
 * - メール・パスワード入力
 * - 新規登録処理
 * - バリデーション・エラー表示 */
export const CreateUserPage: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const pageStore = useCreateUserPageStore();
  
  // 統合フックで全ハンドラーを取得
  const {
    handleEmailChange,
    handlePasswordChange,
    handleCreateUser,
  } = createUserPageHandlers();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      
      {/* フォームコンテナ */}
      <View style={styles.formContainer}>
        {/* Email入力フィールド */}
        <EmailInputFieldEntry
          value={pageStore.userCreateForm.email.value}
          onChange={handleEmailChange}
          error={pageStore.emailError}
          placeholder={t('auth.createUser.emailPlaceholder')}
        />
        
        {/* Password入力フィールド */}
        <PasswordInputFieldEntry
          value={pageStore.userCreateForm.password.value}
          onChange={handlePasswordChange}
          error={pageStore.passwordError}
          placeholder={t('auth.createUser.passwordPlaceholder')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
