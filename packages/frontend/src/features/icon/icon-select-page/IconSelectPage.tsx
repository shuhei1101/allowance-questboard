import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/core/theme';
import { useSelectIconPageStore as useIconSelectPageStore } from './stores/iconSelectPageStore';
import { useSelectIconPageHandlers as useIconSelectPageHandlers } from './hooks/useIconSelectPageHandlers';
import { TabBar } from './components/TabBar';
import { IconGrid } from './components/IconGrid';
import { Icon } from '@backend/features/icon/domain/icon';
import { ComfirmButton } from '@/features/shared/components/ActionButtons';

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
}

/**
 * アイコン選択画面
 * カテゴリごとにタブで分けられたアイコン一覧から、アイコンを選択する画面
 */
export const IconSelectPage: React.FC<Props> = ({
  initialSelectedIcon,
  onIconSelected,
}) => {
  const { colors } = useTheme();
  const pageStore = useIconSelectPageStore();
  const navigation = useNavigation();
  
  const {
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  } = useIconSelectPageHandlers({ 
    onIconSelected,
    initialSelectedIcon
  });

  // 確定ボタンをヘッダーに設置
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
          onPress={handleConfirm}
          disabled={!pageStore.selectedIcon || 
            (initialSelectedIcon && 
             pageStore.selectedIcon?.key.equals(initialSelectedIcon.key))}
          variant="header"
        />
      ),
    });
  }, [navigation, handleConfirm, pageStore.selectedIcon, initialSelectedIcon]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
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
