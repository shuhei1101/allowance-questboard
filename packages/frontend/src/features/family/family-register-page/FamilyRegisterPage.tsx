import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { ComfirmButton } from '@/features/shared/components/ComfirmButton';
import { FamilyNameInputEntry } from './components/FamilyNameInputEntry';
import { OnlineFamilyNameInputEntry } from './components/OnlineFamilyNameInputEntry';
import { FamilyIdInputEntry } from './components/FamilyIdInputEntry';
import { IconSelectInputEntry } from './components/IconSelectInputEntry';
import { ParentInfoInputEntry } from './components/ParentInfoInputEntry';
import { FamilyRegisterForm } from './models/familyRegisterForm';
import { Parent } from '@backend/features/parent/models/parent';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';

export interface FamilyRegisterPageProps {
  /** 家族登録フォーム */
  form: FamilyRegisterForm;
  /** 親情報 */
  parent?: Parent;
  /** 家族名変更ハンドラー */
  onFamilyNameChange: (value: BaseFamilyName) => void;
  /** オンライン家族名変更ハンドラー */
  onOnlineFamilyNameChange: (value: FamilyOnlineName) => void;
  /** 家族ID変更ハンドラー */
  onFamilyIdChange: (value: FamilyDisplayId) => void;
  /** 家紋選択ハンドラー */
  onIconSelect: () => void;
  /** 親情報編集ハンドラー */
  onParentEdit: () => void;
  /** 確定ボタンハンドラー */
  onSubmit: (familyId?: string, parentId?: string) => void;
  /** フォームバリデーション状態 */
  isValid: boolean;
  /** ローディング状態 */
  isLoading?: boolean;
  /** 無効状態 */
  disabled?: boolean;
}

/** 家族登録画面
 *
 * 新規家族と親情報を登録する画面
 * 家族情報と親情報の両方のフォームを管理し、親情報編集画面への遷移機能付き */
export const FamilyRegisterPage: React.FC<FamilyRegisterPageProps> = ({
  form,
  parent,
  onFamilyNameChange,
  onOnlineFamilyNameChange,
  onFamilyIdChange,
  onIconSelect,
  onParentEdit,
  onSubmit,
  isValid,
  isLoading = false,
  disabled = false,
}) => {
  const { colors } = useTheme();

  const handleSubmit = () => {
    if (isValid && !isLoading && !disabled) {
      onSubmit();
    }
  };

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
            value={form.family.name}
            onChange={onFamilyNameChange}
            disabled={disabled}
          />
        </View>

        {/* オンライン家族名入力 */}
        <View style={styles.section}>
          <OnlineFamilyNameInputEntry
            value={form.family.onlineName}
            onChange={onOnlineFamilyNameChange}
            disabled={disabled}
          />
        </View>

        {/* 家族ID入力 */}
        <View style={styles.section}>
          <FamilyIdInputEntry
            value={form.family.displayId}
            onChange={onFamilyIdChange}
            disabled={disabled}
          />
        </View>

        {/* 家紋選択 */}
        <View style={styles.section}>
          <IconSelectInputEntry
            onPress={onIconSelect}
            disabled={disabled}
          />
        </View>

        {/* 親情報 */}
        <View style={styles.section}>
          <ParentInfoInputEntry
            parent={parent}
            onPress={onParentEdit}
            disabled={disabled}
          />
        </View>
      </ScrollView>

      {/* 確定ボタン */}
      <View style={[styles.footer, { backgroundColor: colors.background.primary }]}>
        <ComfirmButton
          onPress={handleSubmit}
          disabled={!isValid || isLoading || disabled}
          loading={isLoading}
        />
      </View>
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
