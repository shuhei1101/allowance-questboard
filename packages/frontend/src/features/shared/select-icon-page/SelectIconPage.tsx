import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/core/theme';
import { useSelectIconPageStore } from './stores/selectIconPageStore';
import { useSelectIconPageHandlers } from './hooks/useSelectIconPageHandlers';
import { ActionBar } from './components/ActionBar';
import { TabBar } from './components/TabBar';
import { IconGrid } from './components/IconGrid';

interface Props {
  /**
   * 初期選択されたアイコン名
   */
  initialSelectedIcon?: string;
  /**
   * アイコンが選択された時のコールバック
   * @param iconName 選択されたアイコン名
   */
  onIconSelected: (iconName: string) => void;
  /**
   * 戻るボタンが押された時のコールバック
   */
  onBack: () => void;
}

/**
 * アイコン選択画面
 * カテゴリごとにタブで分けられたアイコン一覧から、アイコンを選択する画面
 */
export const SelectIconPage: React.FC<Props> = ({
  initialSelectedIcon,
  onIconSelected,
  onBack,
}) => {
  const { colors } = useTheme();
  const pageStore = useSelectIconPageStore();
  
  const {
    handleBack,
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  } = useSelectIconPageHandlers({ 
    initialSelectedIcon, 
    onIconSelected, 
    onBack 
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* アクションバー */}
      <ActionBar
        onBack={handleBack}
        onConfirm={handleConfirm}
        isConfirmEnabled={!!pageStore.selectedIcon}
      />
      
      {/* タブバー */}
      <TabBar
        categories={pageStore.iconCategories}
        selectedCategoryId={pageStore.selectedCategoryId}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* アイコン一覧 */}
      <View style={styles.contentContainer}>
        <IconGrid
          icons={pageStore.currentCategoryIcons}
          selectedIcon={pageStore.selectedIcon}
          onIconSelect={handleIconSelect}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
