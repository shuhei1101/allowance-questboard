import { create } from 'zustand';
import { IconCategory } from '@backend/features/icon-category/domain/iconCategory';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconName } from '@backend/features/icon/value-objects/iconName';
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
   * 現在選択されているアイコン名
   */
  selectedIcon?: IconName;
  
  /**
   * 現在のカテゴリのアイコン一覧
   */
  currentCategoryIcons: Icons;
  
  /**
   * 初期化処理
   * @param iconCategories アイコンカテゴリ一覧
   * @param initialSelectedIcon 初期選択されたアイコン名
   */
  initialize: (iconCategories: IconCategory[], initialSelectedIcon?: string) => void;
  
  /**
   * カテゴリを変更
   * @param categoryId 変更先のカテゴリID
   */
  selectCategory: (categoryId: IconCategoryId) => void;
  
  /**
   * アイコンを選択
   * @param iconName 選択するアイコン名
   */
  selectIcon: (iconName: string) => void;
  
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
    const iconCategoriesCollection = new IconCategories(iconCategories);
    const activeCategories = iconCategoriesCollection.getActiveSortedCategories();
    const firstCategory = activeCategories.length > 0 ? activeCategories[0] : undefined;
    // 最初のカテゴリのアクティブでソートされたアイコンを取得
    const firstCategoryIcons: Icon[] = firstCategory 
      ? firstCategory.getActiveSortedIcons().items 
      : [];
    
    set({
      iconCategories: new IconCategories(activeCategories),
      selectedCategoryId: firstCategory?.key,
      selectedIcon: undefined, // 初期選択は常に無しに設定
      currentCategoryIcons: new Icons(firstCategoryIcons),
    });
  },
  
  selectCategory: (categoryId) => {
    const { iconCategories } = get();
    const category = iconCategories.get(categoryId);
    // カテゴリのアクティブでソートされたアイコンを取得
    const categoryIcons: Icon[] = category 
      ? category.getActiveSortedIcons().items 
      : [];
    
    set({
      selectedCategoryId: categoryId,
      currentCategoryIcons: new Icons(categoryIcons),
    });
  },
  
  selectIcon: (iconName) => {
    set({
      selectedIcon: new IconName(iconName),
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
