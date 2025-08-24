import { useConfirmHandler } from './useConfirmHandler';
import { useCategoryChangeHandler } from './useCategoryChangeHandler';
import { useIconSelectHandler } from './useIconSelectHandler';
import { useSelectIconPageStore } from '../stores/iconSelectPageStore';
import { Icon } from '@backend/features/icon/domain/icon';

/**
 * アイコン選択ページの全ハンドラーを統合したカスタムフック
 * 
 * アイコン選択ページで使用する全てのイベントハンドラーを一括で提供
 * 
 * @param onIconSelected アイコン選択時のコールバック関数
 */
export const useSelectIconPageHandlers = (params: {
  onIconSelected: (icon: Icon) => void;
}) => {
  const pageStore = useSelectIconPageStore();

  // 確定ボタン押下時のハンドラ
  const handleConfirm = useConfirmHandler({
    selectedIcon: pageStore.selectedIcon,
    onIconSelected: params.onIconSelected,
  });

  // カテゴリ変更時のハンドラ
  const handleCategoryChange = useCategoryChangeHandler({
    selectCategory: pageStore.selectCategory,
  });

  // アイコン選択時のハンドラ
  const handleIconSelect = useIconSelectHandler({
    selectIcon: pageStore.selectIcon,
  });

  return {
    handleConfirm,
    handleCategoryChange,
    handleIconSelect,
  };
};
