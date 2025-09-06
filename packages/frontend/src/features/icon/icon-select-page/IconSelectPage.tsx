import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useIconSelectPageStore } from './stores/iconSelectPageStore';
import { useSelectIconPageHandlers as useIconSelectPageHandlers } from './hooks/useIconSelectPageHandlers';
import { IconCategoriesTab } from './components/IconCategoriesTab';
import { IconGrid } from './components/IconGrid';
import { Icon } from '@backend/features/icon/domain/icon';
import { useEffect } from 'react';
import { AppError } from '@backend/core/errors/appError';
import { LocaleString } from '@backend/core/messages/localeString';
import { ComfirmButton } from '../../shared/components';
import { OnIconSelected } from './hooks/useConfirmHandler';
import { Constants } from '../../../core/constants/appConstants';
import { useAppNavigation } from '../../../../AppNavigator';

export interface IconSelectPageProps {
  /** 初期選択されたアイコン */
  initialSelectedIcon?: Icon;
  /** アイコンが選択されたときのコールバック */
  onIconSelected: OnIconSelected;
}

/**
 * アイコン選択画面
 * カテゴリごとにタブで分けられたアイコン一覧から、アイコンを選択する画面
 */
export const IconSelectPage: React.FC<IconSelectPageProps> = ({
  initialSelectedIcon,
  onIconSelected,
}) => {
  const { colors } = useTheme();
  const pageStore = useIconSelectPageStore();
  const navigation = useAppNavigation();
  
  const iconCategories = Constants.iconCategories;
  if (!iconCategories) {
    throw new AppError({
      errorType: 'ICON_CATEGORIES_NOT_FOUND',
      message: new LocaleString({
        ja: 'アイコンカテゴリが見つかりませんでした。',
        en: 'Icon categories not found.',
      })
    });
  }
  // 初期化
  useEffect(() => {
      pageStore.initialize(
        iconCategories,
        initialSelectedIcon
      );

    // クリーンアップ時にストアをリセット
    return () => {
      pageStore.reset();
    };
  }, []);

  const {
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  } = useIconSelectPageHandlers({ 
    onIconSelected
  });

  // 確定ボタンをヘッダーに設置
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
          onPress={handleConfirm}
          disabled={!pageStore.selectedIcon || 
            (initialSelectedIcon && 
             pageStore.selectedIcon?.key?.equals(initialSelectedIcon.key))}
          variant="header"
        />
      ),
    });
  }, [navigation, handleConfirm, pageStore.selectedIcon, initialSelectedIcon]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* タブバー */}
      <IconCategoriesTab
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
          getAppIcon={Constants.getAppIcon}
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
