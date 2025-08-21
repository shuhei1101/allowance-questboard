import { useEffect } from 'react';
import { useSelectIconPageStore } from '../stores/iconSelectPageStore';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { AppConstants } from '@/core/constants/appConstants';
import { Icon } from '@backend/features/icon/domain/icon';

interface Props {
  /**
   * アイコンが選択された時のコールバック
   * @param icon 選択されたアイコン
   */
  onIconSelected: (icon: Icon) => void;
  /**
   * 戻るボタンが押された時のコールバック
   */
  onBack: () => void;
  /**
   * 初期選択されたアイコン
   */
  initialSelectedIcon?: Icon;
}

/**
 * アイコン選択ページのイベントハンドラー
 */
export const useSelectIconPageHandlers = ({
  onIconSelected,
  onBack,
  initialSelectedIcon,
}: Props) => {
  const pageStore = useSelectIconPageStore();

  // 初期化
  useEffect(() => {
    if (AppConstants.iconCategories) {
      pageStore.initialize(
        AppConstants.iconCategories,
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
   * @param icon 選択するアイコン
   */
  const handleIconSelect = (icon: Icon) => {
    pageStore.selectIcon(icon);
  };

  return {
    handleBack,
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  };
};
