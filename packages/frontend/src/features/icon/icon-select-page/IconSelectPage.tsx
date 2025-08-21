import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useSelectIconPageStore as useIconSelectPageStore } from './stores/iconSelectPageStore';
import { useSelectIconPageHandlers as useIconSelectPageHandlers } from './hooks/useIconSelectPageHandlers';
import { ActionBar } from './components/ActionBar';
import { TabBar } from './components/TabBar';
import { IconGrid } from './components/IconGrid';
import { Icon } from '@backend/features/icon/domain/icon';

interface Props {
  /**
   * 初期選択されたアイコン
   */
  initialSelectedIcon?: Icon;
  /**
   * アイコンが選択された時のコールバック
   * @param icon 選択されたアイコン
   */
  onIconSelected: (icon: Icon) => void;
  /**
   * 戻るボタンが押された時のコールバック
   */
  onBack: () => void;
}

/**
 * アイコン選択画面
 * カテゴリごとにタブで分けられたアイコン一覧から、アイコンを選択する画面
 */
export const IconSelectPage: React.FC<Props> = ({
  initialSelectedIcon,
  onIconSelected,
  onBack,
}) => {
  const { colors } = useTheme();
  const pageStore = useIconSelectPageStore();
  
  const {
    handleBack,
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  } = useIconSelectPageHandlers({ 
    onIconSelected, 
    onBack,
    initialSelectedIcon
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* アクションバー */}
      <ActionBar
        onBack={handleBack}
        onConfirm={handleConfirm}
        isConfirmEnabled={
          !!pageStore.selectedIcon && 
          (
            !initialSelectedIcon || 
            !pageStore.selectedIcon.key.equals(initialSelectedIcon.key)
          )
        }
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
