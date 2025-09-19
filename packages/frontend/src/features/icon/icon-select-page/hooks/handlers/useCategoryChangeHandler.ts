import { useCallback } from 'react';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { SelectCategory } from '../../stores/iconSelectPageStore';

/**
 * カテゴリ変更ハンドラーのカスタムフック
 * 
 * カテゴリを選択し、そのカテゴリのアイコンを表示する
 */
export const useCategoryChangeHandler = (params: {
  selectCategory: SelectCategory;
}) => {
  return useCallback((categoryId: IconCategoryId) => {
    params.selectCategory(categoryId);
  }, [params.selectCategory]);
};
