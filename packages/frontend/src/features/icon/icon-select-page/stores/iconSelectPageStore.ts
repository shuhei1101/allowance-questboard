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
interface IconSelectPageState {
  /** アイコンカテゴリ */
  iconCategories: IconCategories;
  /** 選択中のカテゴリID */
  selectedCategoryId?: IconCategoryId;
  /** 選択中のアイコン */
  selectedIcon?: Icon;
  /** 現在のカテゴリのアイコン */
  currentCategoryIcons: Icons;
  /** 初期化 */
  initialize: Initialize;
  /** カテゴリ選択 */
  selectCategory: SelectCategory;
  /** アイコン選択 */
  selectIcon: SelectIcon;
  /** アイコン選択時のハンドラ */
  handleIconSelect?: (icon: Icon) => void;
  /** アイコン選択ハンドラーをセット */
  setIconSelectHandler: (handler: SelectIcon) => void;
  /** リセット */
  reset: Reset;
}

/**
 * アイコン選択ページのストア
 */
export const useIconSelectPageStore = create<IconSelectPageState>((set, get) => ({
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

  setIconSelectHandler: (handler: SelectIcon) => {
    set({
      handleIconSelect: handler,
    });
  },

  reset: () => {
    set({
      iconCategories: IconCategories.fromEmpty() as IconCategories,
      selectedCategoryId: undefined,
      selectedIcon: undefined,
      currentCategoryIcons: Icons.fromEmpty() as Icons,
      handleIconSelect: undefined,
    });
  },
}));
