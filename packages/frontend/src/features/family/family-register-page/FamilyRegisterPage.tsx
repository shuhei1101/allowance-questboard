import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyNameInputEntry } from './components/FamilyNameInputEntry';
import { OnlineFamilyNameInputEntry } from './components/OnlineFamilyNameInputEntry';
import { FamilyIdInputEntry } from './components/FamilyIdInputEntry';
import { IconSelectInputEntry } from './components/IconSelectInputEntry';
import { ParentInfoInputEntry } from './components/ParentInfoInputEntry';
import { useFamilyRegisterFormStore } from './stores/familyRegisterFormStore';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { ParentId } from '../../../../../backend/src/features/parent/value-object/parentId';
import { createFamilyRegisterPageHandlers } from './hooks/createFamilyRegisterPageHandlers';
import { FamilyId } from '../../../../../backend/src/features/family/value-object/familyId';
import { ConfirmButton } from '../../shared/components/ComfirmButton';
import { useAppNavigation } from '../../../../AppNavigator';

export interface FamilyRegisterPageProps {
  onSubmitComplete?: (params: {familyId: FamilyId, parentId: ParentId}) => void;
}

/** 家族登録画面
 *
 * 新規家族と親情報を登録する画面
 * 家族情報と親情報の両方のフォームを管理し、親情報編集画面への遷移機能付き */
export const FamilyRegisterPage: React.FC<FamilyRegisterPageProps> = ({
  onSubmitComplete,
}) => {
  const { colors } = useTheme();
  const formStore = useFamilyRegisterFormStore();
  const sessionStore = useSessionStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigation = useAppNavigation();

  useEffect(() => {
    formStore.resetForm();  // フォームストアのリセット
  }, []);

  // 統合フックで全ハンドラーを取得
  const {
    handleFamilyNameChange,
    handleOnlineFamilyNameChange,
    handleFamilyIdChange,
    isCheckingDuplicate,
    duplicateError,
    handleFamilyIconSelect,
    handleParentEdit,
    handleSubmit
  } = createFamilyRegisterPageHandlers({
    onSubmitComplete,
    setLoading,
    formStore,
    sessionStore,
  });

  // 確定ボタン
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ConfirmButton
          onPress={handleSubmit}
          disabled={!formStore.form.isValid}
          loading={isLoading}
          variant="header"
        />
      ),
    });
  }, [navigation, handleSubmit, formStore.form.isValid, isLoading]);



  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 家族名入力 */}
        <View style={styles.section}>
          <FamilyNameInputEntry
            value={formStore.form.family.name}
            onChange={handleFamilyNameChange}
            disabled={false}
          />
        </View>

        {/* オンライン家族名入力 */}
        <View style={styles.section}>
          <OnlineFamilyNameInputEntry
            value={formStore.form.family.onlineName}
            onChange={handleOnlineFamilyNameChange}
            disabled={false}
          />
        </View>

        {/* 家族ID入力 */}
        <View style={styles.section}>
          <FamilyIdInputEntry
            value={formStore.form.family.displayId}
            onChange={handleFamilyIdChange}
            disabled={false}
          />
        </View>

        {/* 家紋選択 */}
        <View style={styles.section}>
          <IconSelectInputEntry
            onPress={handleFamilyIconSelect}
            disabled={false}
          />
        </View>

        {/* 親情報 */}
        <View style={styles.section}>
          <ParentInfoInputEntry
            parentName={formStore.form.parent.name}
            onPress={handleParentEdit}
            disabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // 確定ボタン分の余白
  },
  section: {
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
