import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useLayoutEffect, useEffect, useState } from 'react';
import { ParentNameInputFieldEntry } from './components/ParentNameInputFieldEntry';
import { useTheme } from '@/core/theme';
import { useParentFormStore } from './stores/parentFormStore';
import { parentEditPageHandlers } from './hooks/parentEditPageHandlers';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { createAuthenticatedClient } from '@/core/api/trpcClient';
import { ParentForm } from './models/parentForm';
import { JwtStorage } from '../../auth/services/jwtStorage';
import { useInitializeParentData } from './hooks/handlers/useParentDataInitializer';
import { useAppNavigation } from '../../../../AppNavigator';
import { ComfirmButton } from '../../shared/components/ComfirmButton';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { useIconStore } from '../../../core/constants/iconStore';
import { useTranslation } from 'react-i18next';
import { EmailInputEntry } from '../../shared/components/EmailInputEntry';
import { PasswordInputEntry } from '../../shared/components/PasswordInputEntry';
import { IconSelectButtonEntry } from '../../shared/components/IconSelectButtonEntry';
import { BirthdayInputEntry } from '../../shared/components/BirthdayInputEntry';

export type HandleParentForm = (form: ParentForm) => void;

/** 親情報編集画面
 * 家族の親情報を編集するためのページ */
export interface ParentEditPageProps {
  shouldUpdate?: boolean;  // 更新クエリを送信するかのフラグ（デフォルト: true）
  parentId?: ParentId; // 親ID（オプション）
  handleParentForm?: HandleParentForm;
  initialParentForm?: ParentForm; // 初期フォームデータ（オプション）
}

export const ParentEditPage: React.FC<ParentEditPageProps> = async ({
  shouldUpdate = true,
  parentId,
  handleParentForm,
  initialParentForm,
}) => {
  const { colors } = useTheme();
  const formStore = useParentFormStore();
  const sessionStore = useSessionStore();
  const iconStore = useIconStore();
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);

  // 画面離脱時のクリーンアップ
  useEffect(() => {
      formStore.resetForm(); // フォームストアのリセット
  }, []);

  // 親ルーターの作成
  const parentRouter = createAuthenticatedClient({
    jwtToken: await JwtStorage.getToken(),
    languageType: sessionStore.languageType,
  }).parent.getParent;

  // 親データ初期化フック（initialParentFormがない場合のみ実行される）
  useInitializeParentData({
    parentId: initialParentForm ? undefined : parentId, // initialParentFormがある場合はparentIdを無効化
    parentRouter: parentRouter,
    getAllIcons: iconStore.getAllIcons,
    setParentForm: formStore.setForm,
  });

  // initialParentFormによる初期化
  useEffect(() => {
    if (initialParentForm) {
      // 引数で渡された初期フォームデータをストアに設定
      formStore.setForm(initialParentForm);
    }
  }, [initialParentForm, formStore]);

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
    sessionStore,
    formStore,
    setLoading
  });

  // 確定ボタン
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
          onPress={handleConfirm}
          disabled={!formStore.form.isValid}
          loading={isLoading}
          variant="header"
        />
      ),
    });
  }, [navigation, handleConfirm, formStore.form.isValid, isLoading]);
  
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
            value={formStore.form.name.value}
            onChange={handleNameChange}
            error={formStore.errors.name || undefined}
          />
          
          {/* メールアドレス入力フィールド */}
          <EmailInputEntry
            value={formStore.form.email.value}
            onChange={handleEmailChange}
            error={formStore.errors.email || undefined}
          />
          
          {/* パスワード入力フィールド */}
          <PasswordInputEntry
            value={formStore.form.password.value}
            onChange={handlePasswordChange}
            error={formStore.errors.password || undefined}
          />
          
          {/* アイコン選択ボタン */}
          <IconSelectButtonEntry
            selectedIcon={formStore.form.icon}
            onIconSelected={handleIconSelect}
            title={t('shared.components.iconSelectButtonEntry.fieldTitle')}
          />
          
          {/* 誕生日入力フィールド */}
          <BirthdayInputEntry
            value={formStore.form.birthday.toISOString()}
            onChange={handleBirthdayChange}
            error={formStore.errors.birthday || undefined}
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
