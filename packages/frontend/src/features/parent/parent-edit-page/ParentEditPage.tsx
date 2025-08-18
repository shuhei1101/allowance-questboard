import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ParentNameInputFieldEntry } from './components/ParentNameInputFieldEntry';
import { EmailInputFieldEntry } from '../../shared/components/EmailInputFieldEntry';
import { PasswordInputFieldEntry } from '../../shared/components/PasswordInputFieldEntry';
import { IconSelectButtonEntry } from '../../shared/components/IconSelectButtonEntry';
import { BirthdayInputFieldEntry } from '../../shared/components/BirthdayInputFieldEntry';
import { SaveButton } from '../../shared/components/SaveButton';
import { useTheme } from '@/core/theme';
import { useParentEditPageStore } from './stores/parentEditPageStore';
import { useParentEditPageHandlers } from './hooks/useParentEditPageHandlers';
import { useSessionStore } from '@/features/auth/stores/sessionStore';

/**
 * 親情報編集画面
 * 家族の親情報を編集するためのページ
 * 
 * Props:
 * - onConfirm: 確定ボタン押下時のコールバック関数
 * 
 * 機能:
 * - 親の名前入力
 * - メールアドレス入力
 * - パスワード入力
 * - アイコン選択（一旦は画面遷移のメッセージ表示）
 * - 誕生日入力
 * - 入力値のバリデーション
 * - 必須項目が未入力時の確定ボタン無効化
 */
interface Props {
  onConfirm: (parentData: any) => void;
}

export const ParentEditPage: React.FC<Props> = ({ onConfirm }) => {
  const { colors } = useTheme();
  const pageStore = useParentEditPageStore();
  const sessionStore = useSessionStore();
  const navigation = useNavigation();
  
  // 統合フックで全ハンドラーを取得
  const {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleIconSelect,
    handleBirthdayChange,
    handleConfirm,
  } = useParentEditPageHandlers(onConfirm);

  // ナビゲーションヘッダーに保存ボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          onPress={handleConfirm}
          disabled={!pageStore.parentForm.isValid}
          loading={pageStore.isLoading}
          variant="header"
        />
      ),
    });
  }, [navigation, handleConfirm, pageStore.parentForm.isValid, pageStore.isLoading]);
  
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
        {/* フォームコンテナ */}
        <View style={styles.formContainer}>
          {/* 名前入力フィールド */}
          <ParentNameInputFieldEntry
            value={pageStore.parentForm.name.value}
            onChange={handleNameChange}
            error={pageStore.nameError || undefined}
          />
          
          {/* メールアドレス入力フィールド */}
          <EmailInputFieldEntry
            value={pageStore.parentForm.email.value}
            onChange={handleEmailChange}
            error={pageStore.emailError || undefined}
          />
          
          {/* パスワード入力フィールド */}
          <PasswordInputFieldEntry
            value={pageStore.parentForm.password.value}
            onChange={handlePasswordChange}
            error={pageStore.passwordError || undefined}
          />
          
          {/* アイコン選択ボタン */}
          <IconSelectButtonEntry
            selectedIcon={pageStore.parentForm.icon.value}
            onPress={handleIconSelect}
          />
          
          {/* 誕生日入力フィールド */}
          <BirthdayInputFieldEntry
            value={pageStore.parentForm.birthday.value}
            onChange={handleBirthdayChange}
            error={pageStore.birthdayError || undefined}
          />
        </View>
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  formContainer: {
    flex: 1,
  },
});
