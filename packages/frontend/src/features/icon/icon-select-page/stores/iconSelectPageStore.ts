import { create } from 'zustand';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';
import { Icons } from '@backend/features/icon/domain/icons';

export type Initialize = (iconCategories: IconCategories, initialSelectedIcon?: Icon) => void;
export type SelectCategory = (categoryId: IconCategoryId) => void;
export type SelectIcon = (icon: Icon) => void;
export type Reset = () => void;

/**
 * アイコン選択ページの状態管理
 */
interface SelectIconPageState {
  iconCategories: IconCategories;
  selectedCategoryId?: IconCategoryId;
  selectedIcon?: Icon;
  currentCategoryIcons: Icons;
  initialize: Initialize;
  selectCategory: SelectCategory;
  selectIcon: SelectIcon;
  reset: Reset;
}

/**
 * アイコン選択ページのストア
 */
export const useSelectIconPageStore = create<SelectIconPageState>((set, get) => ({
  iconCategories: IconCategories.fromEmpty() as IconCategories,
  selectedCategoryId: undefined,
  selectedIcon: undefined,
  currentCategoryIcons: Icons.fromEmpty() as Icons,
  
  initialize: (iconCategories, initialSelectedIcon) => {
    const activeCategories = iconCategories.getActiveSortedCategories();
    const firstCategory = activeCategories.length > 0 ? activeCategories[0] : undefined;
    // 最初のカテゴリのアクティブでソートされたアイコンを取得
    set({
      iconCategories: new IconCategories(activeCategories),
      selectedCategoryId: firstCategory?.key || undefined,
      selectedIcon: initialSelectedIcon, // 初期選択されたアイコンを設定
      currentCategoryIcons: firstCategory ? firstCategory.getActiveSortedIcons() : Icons.fromEmpty() as Icons,
    });
  },
  
  selectCategory: (categoryId) => {
    const { iconCategories } = get();
    const category = iconCategories.get(categoryId);
    if (!category) {
      return;
    }
    set({
      selectedCategoryId: categoryId,
      currentCategoryIcons: category.getActiveSortedIcons(),
    });
  },
  
  selectIcon: (icon) => {
    set({
      selectedIcon: icon,
    });
  },
  
  reset: () => {
    set({
      iconCategories: IconCategories.fromEmpty() as IconCategories,
      selectedCategoryId: undefined,
      selectedIcon: undefined,
      currentCategoryIcons: Icons.fromEmpty() as Icons,
    });
  },
}));
