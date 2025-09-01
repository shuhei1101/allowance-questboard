import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import { ParentNameInputFieldEntry } from './components/ParentNameInputFieldEntry';
import { EmailInputFieldEntry } from '../../shared/components/EmailInputFieldEntry';
import { PasswordInputFieldEntry } from '../../shared/components/PasswordInputFieldEntry';
import { IconSelectButtonEntry } from '../../shared/components/IconSelectButtonEntry';
import { BirthdayInputFieldEntry } from '../../shared/components/BirthdayInputFieldEntry';
import { useTheme } from '@/core/theme';
import { useParentEditPageStore } from './stores/parentEditPageStore';
import { parentEditPageHandlers } from './hooks/parentEditPageHandlers';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ComfirmButton } from '@/features/shared/components';
import { createAuthenticatedClient } from '@/core/api/trpcClient';
import { ParentForm } from './models/parentForm';
import { Constants } from '../../../core/constants/appConstants';
import { JwtStorage } from '../../auth/services/jwtStorage';
import { Session } from '../../../core/constants/sessionVariables';
import { useInitializeParentData } from './hooks/useParentDataInitializer';
import { useAppNavigation } from '../../../../AppNavigator';

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
  const navigation = useAppNavigation();

  // 親ルーターの作成
  const parentRouter = createAuthenticatedClient({
    jwtToken: await JwtStorage.getToken(),
    languageType: Session.languageType,
  }).parent.getParent;

  // 親データ初期化フック
  useInitializeParentData({
    parentId: parentId,
    parentRouter: parentRouter,
    getAllIcons: Constants.getAllIcons,
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
    handleParentForm
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
          <EmailInputFieldEntry
            value={pageStore.parentForm.email.value}
            onChange={handleEmailChange}
            error={pageStore.errors.email || undefined}
          />
          
          {/* パスワード入力フィールド */}
          <PasswordInputFieldEntry
            value={pageStore.parentForm.password.value}
            onChange={handlePasswordChange}
            error={pageStore.errors.password || undefined}
          />
          
          {/* アイコン選択ボタン */}
          <IconSelectButtonEntry
            selectedIcon={pageStore.parentForm.icon}
            onIconSelected={handleIconSelect}
          />
          
          {/* 誕生日入力フィールド */}
          <BirthdayInputFieldEntry
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
