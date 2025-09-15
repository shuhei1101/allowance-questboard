import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import { ParentNameInputFieldEntry } from './components/ParentNameInputFieldEntry';
import { EmailInputWithTitle } from '../../shared/components/EmailInputWithTitle';
import { PasswordInputWithTitle } from '../../shared/components/PasswordInputWithTitle';
import { IconSelectButtonWithTitle } from '../../shared/components/IconSelectButtonWithTitle';
import { BirthdayInputWithTitle } from '../../shared/components/BirthdayInputWithTitle';
import { useTheme } from '@/core/theme';
import { useParentEditPageStore } from './stores/parentEditPageStore';
import { parentEditPageHandlers } from './handlers/parentEditPageHandlers';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { createAuthenticatedClient } from '@/core/api/trpcClient';
import { ParentForm } from './models/parentForm';
import { JwtStorage } from '../../auth/services/jwtStorage';
import { useInitializeParentData } from './handlers/useParentDataInitializer';
import { useAppNavigation } from '../../../../AppNavigator';
import { ComfirmButton } from '../../shared/components/ComfirmButton';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { useIconStore } from '../../../core/constants/iconStore';

export type HandleParentForm = (form: ParentForm) => void;

/** 親情報編集画面
 * 家族の親情報を編集するためのページ */
export interface ParentEditPageProps {
  shouldUpdate?: boolean;  // 更新クエリを送信するかのフラグ（デフォルト: true）
  parentId?: ParentId; // 親ID（オプション）
  handleParentForm?: HandleParentForm;
}

export const ParentEditPage: React.FC<ParentEditPageProps> = async ({
  shouldUpdate: shouldUpdate = true,
  parentId,
  handleParentForm,
}) => {
  const { colors } = useTheme();
  const pageStore = useParentEditPageStore();
  const sessionStore = useSessionStore();
  const iconStore = useIconStore();
  const navigation = useAppNavigation();

  // 親ルーターの作成
  const parentRouter = createAuthenticatedClient({
    jwtToken: await JwtStorage.getToken(),
    languageType: sessionStore.languageType,
  }).parent.getParent;

  // 親データ初期化フック
  useInitializeParentData({
    parentId: parentId,
    parentRouter: parentRouter,
    getAllIcons: iconStore.getAllIcons,
    setParentForm: pageStore.setParentForm
  });

  // 統合フックで全ハンドラーを取得
  const {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleIconSelect,
    handleBirthdayChange,
    handleConfirm,
  } = parentEditPageHandlers({
    shouldUpdate,
    parentId,
    handleParentForm,
    sessionStore
  });

  // 確定ボタン
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
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
            error={pageStore.errors.name || undefined}
          />
          
          {/* メールアドレス入力フィールド */}
          <EmailInputWithTitle
            value={pageStore.parentForm.email.value}
            onChange={handleEmailChange}
            error={pageStore.errors.email || undefined}
          />
          
          {/* パスワード入力フィールド */}
          <PasswordInputWithTitle
            value={pageStore.parentForm.password.value}
            onChange={handlePasswordChange}
            error={pageStore.errors.password || undefined}
          />
          
          {/* アイコン選択ボタン */}
          <IconSelectButtonWithTitle
            selectedIcon={pageStore.parentForm.icon}
            onIconSelected={handleIconSelect}
          />
          
          {/* 誕生日入力フィールド */}
          <BirthdayInputWithTitle
            value={pageStore.parentForm.birthday.toISOString()}
            onChange={handleBirthdayChange}
            error={pageStore.errors.birthday || undefined}
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
