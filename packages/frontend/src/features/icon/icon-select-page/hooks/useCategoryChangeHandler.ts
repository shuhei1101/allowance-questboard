import { useCallback } from 'react';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';

/**
 * カテゴリ変更ハンドラーのカスタムフック
 * 
 * カテゴリを選択し、そのカテゴリのアイコンを表示する
 */
export const useCategoryChangeHandler = (params: {
  selectCategory: (categoryId: IconCategoryId) => void;
}) => {
  return useCallback((categoryId: IconCategoryId) => {
    params.selectCategory(categoryId);
  }, [params.selectCategory]);
};
