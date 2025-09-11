import { create, StoreApi } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';

interface UserRegisterPageProperties extends BasePageProperties {}

interface UserRegisterPageActions extends BasePageActions {}

class UserRegisterPageStoreClass extends BasePageStore<UserRegisterPageProperties, UserRegisterPageActions> {
  
  protected buildDefaultProperties(): UserRegisterPageProperties {
    return {
      ...super.buildDefaultProperties(),
    };
  }

  protected buildActions(
    set: StoreApi<UserRegisterPageProperties & BasePageActions & UserRegisterPageActions>['setState'],
    get: StoreApi<UserRegisterPageProperties & BasePageActions & UserRegisterPageActions>['getState']
  ): UserRegisterPageActions {
    return {
      ...super.buildActions(set, get),
    };
  }
}

const userRegisterPageStore = new UserRegisterPageStoreClass();
export type UserRegisterPageStore = UserRegisterPageProperties & UserRegisterPageActions;

/** 新規登録ページ状態管理ストア */
export const useUserRegisterPageStore = create<UserRegisterPageStore>()(
    (set, get) => userRegisterPageStore.createStore(set, get)
);
