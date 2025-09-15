import { create, StoreApi } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';
import { RoleSelectData } from '../models/roleSelectData';

// ページ固有の状態シグネチャ
export type SetRoleSelectData = (data: RoleSelectData) => void;

interface RoleSelectPageProperties extends BasePageProperties {
  /** ロール選択データ */
  roleSelectData: RoleSelectData;
}

interface RoleSelectPageActions extends BasePageActions {
  /** ロール選択データ設定 */
  setRoleSelectData: SetRoleSelectData;
}

class RoleSelectPageStoreClass extends BasePageStore<RoleSelectPageProperties, RoleSelectPageActions> {
  
  protected buildDefaultProperties(): RoleSelectPageProperties {
    return {
      ...super.buildDefaultProperties(),
      roleSelectData: RoleSelectData.initialize(),
    };
  }

  /** setRoleSelectDataアクションを生成 */
  protected setRoleSelectData(set: any): SetRoleSelectData {
    return (data: RoleSelectData) => set({ roleSelectData: data }, false, 'setRoleSelectData');
  }

  protected buildActions(
    set: StoreApi<RoleSelectPageProperties & BasePageActions & RoleSelectPageActions>['setState'],
    get: StoreApi<RoleSelectPageProperties & BasePageActions & RoleSelectPageActions>['getState']
  ): RoleSelectPageActions {
    return {
      ...super.buildActions(set, get),
      setRoleSelectData: this.setRoleSelectData(set),
    };
  }
}

const roleSelectPageStore = new RoleSelectPageStoreClass();
export type RoleSelectPageStore = RoleSelectPageProperties & RoleSelectPageActions;

/** ロール選択ページ状態管理ストア */
export const useRoleSelectPageStore = create<RoleSelectPageStore>()(
    (set, get) => roleSelectPageStore.createStore(set, get)
);
