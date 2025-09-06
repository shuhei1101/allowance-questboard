import { create } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';

// ページ固有の状態シグネチャ
export type IsConfirmed = boolean;
export type SetConfirmed = (confirmed: boolean) => void;

interface FamilyCreatePageProperties extends BasePageProperties {
  isConfirmed: IsConfirmed;
}

interface FamilyCreatePageActions extends BasePageActions {
  setConfirmed: SetConfirmed;
}

class FamilyCreatePageStoreClass extends BasePageStore<FamilyCreatePageProperties, FamilyCreatePageActions> {
  
  protected buildDefaultProperties(): FamilyCreatePageProperties {
    return {
      ...super.buildDefaultProperties(),
      isConfirmed: false,
    };
  }

  /** setConfirmedアクションを生成 */
  protected setConfirmed(set: any): SetConfirmed {
    return (confirmed: boolean) => set({ isConfirmed: confirmed }, false, 'setConfirmed');
  }

  protected buildActions(set: any): FamilyCreatePageActions {
    return {
      ...super.buildActions(set),
      setConfirmed: this.setConfirmed(set),
    };
  }
}

const familyCreatePageStore = new FamilyCreatePageStoreClass();
export type FamilyCreatePageStore = FamilyCreatePageProperties & FamilyCreatePageActions;

/** 家族登録ページ状態管理ストア */
export const useFamilyCreatePageStore = create<FamilyCreatePageStore>()(
    (set) => familyCreatePageStore.createStore(set)
);
