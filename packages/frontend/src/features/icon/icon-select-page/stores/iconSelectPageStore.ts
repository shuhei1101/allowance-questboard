import { create } from 'zustand';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';
import { Icons } from '@backend/features/icon/domain/icons';

/**
 * アイコン選択ページの状態管理
 */
interface SelectIconPageState {
  /**
   * 利用可能なアイコンカテゴリ一覧
   */
  iconCategories: IconCategories;
  
  /**
   * 現在選択されているカテゴリID
   */
  selectedCategoryId?: IconCategoryId;
  
  /**
   * 現在選択されているアイコン
   */
  selectedIcon?: Icon;
  
  /**
   * 現在のカテゴリのアイコン一覧
   */
  currentCategoryIcons: Icons;
  
  /**
   * 初期化処理
   * @param iconCategories アイコンカテゴリ一覧
   * @param initialSelectedIcon 初期選択されたアイコン
   */
  initialize: (iconCategories: IconCategories, initialSelectedIcon?: Icon) => void;
  
  /**
   * カテゴリを変更
   * @param categoryId 変更先のカテゴリID
   */
  selectCategory: (categoryId: IconCategoryId) => void;
  
  /**
   * アイコンを選択
   * @param icon 選択するアイコン
   */
  selectIcon: (icon: Icon) => void;
  
  /**
   * 状態をリセット
   */
  reset: () => void;
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
      selectedCategoryId: firstCategory?.key,
      selectedIcon: initialSelectedIcon, // 初期選択されたアイコンを設定
      currentCategoryIcons: firstCategory ? firstCategory.getActiveSortedIcons() : Icons.fromEmpty() as Icons,
    });
  },
  
  selectCategory: (categoryId) => {
    const { iconCategories } = get();
    const category = iconCategories.get(categoryId);
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
