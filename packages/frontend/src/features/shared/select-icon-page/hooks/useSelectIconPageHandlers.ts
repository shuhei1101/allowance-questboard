import { useEffect } from 'react';
import { useSelectIconPageStore } from '../stores/selectIconPageStore';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { AppConstants } from '@/core/constants/appConstants';

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
 * アイコン選択ページのイベントハンドラー
 */
export const useSelectIconPageHandlers = ({
  initialSelectedIcon,
  onIconSelected,
  onBack,
}: Props) => {
  const pageStore = useSelectIconPageStore();

  // 初期化
  useEffect(() => {
    if (AppConstants.iconCategories) {
      pageStore.initialize(
        AppConstants.iconCategories.getActiveSortedCategories(),
        initialSelectedIcon
      );
    }

    // クリーンアップ時にストアをリセット
    return () => {
      pageStore.reset();
    };
  }, [initialSelectedIcon]);

  /**
   * 戻るボタンハンドラー
   */
  const handleBack = () => {
    onBack();
  };

  /**
   * 確定ボタンハンドラー
   */
  const handleConfirm = () => {
    if (pageStore.selectedIcon) {
      onIconSelected(pageStore.selectedIcon);
    }
  };

  /**
   * カテゴリ変更ハンドラー
   * @param categoryId 変更先のカテゴリID
   */
  const handleCategoryChange = (categoryId: IconCategoryId) => {
    pageStore.selectCategory(categoryId);
  };

  /**
   * アイコン選択ハンドラー
   * @param iconName 選択するアイコン名
   */
  const handleIconSelect = (iconName: string) => {
    pageStore.selectIcon(iconName);
  };

  return {
    handleBack,
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  };
};
