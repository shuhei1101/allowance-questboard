import { create, StoreApi } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';

// ページ固有の状態シグネチャ
export type SetSubmitting = (isSubmitting: boolean) => void;
export type SetNavigationDestination = (destination: 'complete' | undefined) => void;

interface FamilyRegisterPageProperties extends BasePageProperties {
  /** 登録処理中フラグ */
  isSubmitting: boolean;
  /** 次の画面遷移先 */
  navigationDestination?: 'complete' | undefined;
}

interface FamilyRegisterPageActions extends BasePageActions {
  /** 登録処理中状態を設定 */
  setSubmitting: SetSubmitting;
  /** 次の画面遷移先を設定 */
  setNavigationDestination: SetNavigationDestination;
}

class FamilyRegisterPageStoreClass extends BasePageStore<FamilyRegisterPageProperties, FamilyRegisterPageActions> {
  
  protected buildDefaultProperties(): FamilyRegisterPageProperties {
    return {
      ...super.buildDefaultProperties(),
      isSubmitting: false,
      navigationDestination: undefined,
    };
  }

  /** setSubmittingアクションを生成 */
  protected setSubmitting(set: any): SetSubmitting {
    return (isSubmitting: boolean) => set({ isSubmitting }, false, 'setSubmitting');
  }

  /** setNavigationDestinationアクションを生成 */
  protected setNavigationDestination(set: any): SetNavigationDestination {
    return (destination: 'complete' | undefined) => set({ navigationDestination: destination }, false, 'setNavigationDestination');
  }

  protected buildActions(
    set: StoreApi<FamilyRegisterPageProperties & BasePageActions & FamilyRegisterPageActions>['setState'],
    get: StoreApi<FamilyRegisterPageProperties & BasePageActions & FamilyRegisterPageActions>['getState']
  ): FamilyRegisterPageActions {
    return {
      ...super.buildActions(set, get),
      setSubmitting: this.setSubmitting(set),
      setNavigationDestination: this.setNavigationDestination(set),
    };
  }
}

const familyRegisterPageStore = new FamilyRegisterPageStoreClass();
export type FamilyRegisterPageStore = FamilyRegisterPageProperties & FamilyRegisterPageActions;

/** 家族登録ページ状態管理ストア */
export const useFamilyRegisterPageStore = create<FamilyRegisterPageStore>()(
    (set, get) => familyRegisterPageStore.createStore(set, get)
);
