import { create } from 'zustand';
import { StoreApi } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';
import { Icons } from '@backend/features/icon/domain/icons';

// 関数シグネチャ
export type Initialize = (iconCategories: IconCategories, initialSelectedIcon?: Icon) => void;
export type SelectCategory = (categoryId: IconCategoryId) => void;
export type SelectIcon = (icon: Icon) => void;

interface IconSelectPageProperties extends BasePageProperties {
  /** アイコンカテゴリ */
  iconCategories: IconCategories;
  /** 選択中のカテゴリID */
  selectedCategoryId?: IconCategoryId;
  /** 選択中のアイコン */
  selectedIcon?: Icon;
  /** 現在のカテゴリのアイコン */
  currentCategoryIcons: Icons;
}

interface IconSelectPageActions extends BasePageActions {
  /** 初期化 */
  initialize: Initialize;
  /** カテゴリ選択 */
  selectCategory: SelectCategory;
  /** アイコン選択 */
  selectIcon: SelectIcon;
}

class IconSelectPageStoreClass extends BasePageStore<IconSelectPageProperties, IconSelectPageActions> {
  
  protected buildDefaultProperties(): IconSelectPageProperties {
    return {
      ...super.buildDefaultProperties(),
      iconCategories: IconCategories.fromEmpty() as IconCategories,
      selectedCategoryId: undefined,
      selectedIcon: undefined,
      currentCategoryIcons: Icons.fromEmpty() as Icons,
    };
  }

  /** 初期化 */
  protected initialize(set: any): Initialize {
    return (iconCategories, initialSelectedIcon) => {
      const activeCategories = iconCategories.getActiveSortedCategories();
      const firstCategory = activeCategories.length > 0 ? activeCategories[0] : undefined;
      // 最初のカテゴリのアクティブでソートされたアイコンを取得
      set({
        iconCategories: new IconCategories(activeCategories),
        selectedCategoryId: firstCategory?.key || undefined,
        selectedIcon: initialSelectedIcon, // 初期選択されたアイコンを設定
        currentCategoryIcons: firstCategory ? firstCategory.getActiveSortedIcons() : Icons.fromEmpty() as Icons,
      }, false, 'initialize');
    };
  }

  /** カテゴリ選択 */
  protected selectCategory(set: any): SelectCategory {
    return (categoryId) => {
      // setの関数形式を使って現在の状態にアクセス
      set((state: any) => {
        const category = state.iconCategories.get(categoryId);
        if (!category) {
          return state;
        }
        return {
          ...state,
          selectedCategoryId: categoryId,
          currentCategoryIcons: category.getActiveSortedIcons(),
        };
      }, false, 'selectCategory');
    };
  }

  /** アイコン選択 */
  protected selectIcon(set: any): SelectIcon {
    return (icon) => {
      set({
        selectedIcon: icon,
      }, false, 'selectIcon');
    };
  }

  protected buildActions(
    set: StoreApi<IconSelectPageProperties & BasePageActions & IconSelectPageActions>['setState'],
    get: StoreApi<IconSelectPageProperties & BasePageActions & IconSelectPageActions>['getState']
  ): IconSelectPageActions {
    return {
      ...super.buildActions(set, get),
      initialize: this.initialize(set),
      selectCategory: this.selectCategory(set),
      selectIcon: this.selectIcon(set),
    };
  }
}

const iconSelectPageStore = new IconSelectPageStoreClass();
export type IconSelectPageStore = IconSelectPageProperties & IconSelectPageActions;

/** アイコン選択ページ状態管理ストア */
export const useIconSelectPageStore = create<IconSelectPageStore>()(
  (set, get) => iconSelectPageStore.createStore(set, get)
);
