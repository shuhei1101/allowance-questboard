import { create } from 'zustand';
import { IconCategory } from '@backend/features/icon-category/domain/iconCategory';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { Icon } from '@backend/features/icon/domain/icon';

/**
 * アイコン選択ページの状態管理
 */
interface IconSelectPageState {
  /**
   * 利用可能なアイコンカテゴリ一覧
   */
  iconCategories: IconCategory[];
  
  /**
   * 現在選択されているカテゴリID
   */
  selectedCategoryId?: IconCategoryId;
  
  /**
   * 現在選択されているアイコン名
   */
  selectedIcon?: string;
  
  /**
   * 現在のカテゴリのアイコン一覧
   */
  currentCategoryIcons: Icon[];
  
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
export const useIconSelectPageStore = create<IconSelectPageState>((set, get) => ({
  iconCategories: [],
  selectedCategoryId: undefined,
  selectedIcon: undefined,
  currentCategoryIcons: [],
  
  initialize: (iconCategories, initialSelectedIcon) => {
    const activeCategories = iconCategories.filter(category => category.isActive);
    const firstCategory = activeCategories.length > 0 ? activeCategories[0] : undefined;
    // 最初のカテゴリのアクティブでソートされたアイコンを取得
    const firstCategoryIcons: Icon[] = firstCategory 
      ? firstCategory.getActiveSortedIcons().items 
      : [];
    
    set({
      iconCategories: activeCategories,
      selectedCategoryId: firstCategory?.id,
      selectedIcon: undefined, // 初期選択は常に無しに設定
      currentCategoryIcons: firstCategoryIcons,
    });
  },
  
  selectCategory: (categoryId) => {
    const { iconCategories } = get();
    const category = iconCategories.find(cat => cat.id.equals(categoryId));
    // カテゴリのアクティブでソートされたアイコンを取得
    const categoryIcons: Icon[] = category 
      ? category.getActiveSortedIcons().items 
      : [];
    
    set({
      selectedCategoryId: categoryId,
      currentCategoryIcons: categoryIcons,
    });
  },
  
  selectIcon: (iconName) => {
    set({
      selectedIcon: iconName,
    });
  },
  
  reset: () => {
    set({
      iconCategories: [],
      selectedCategoryId: undefined,
      selectedIcon: undefined,
      currentCategoryIcons: [],
    });
  },
}));
