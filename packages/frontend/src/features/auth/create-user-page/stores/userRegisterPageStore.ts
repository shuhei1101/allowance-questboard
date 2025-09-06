import { create } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';

interface UserRegisterPageProperties extends BasePageProperties {}

interface UserRegisterPageActions extends BasePageActions {}

class UserRegisterPageStoreClass extends BasePageStore<UserRegisterPageProperties, UserRegisterPageActions> {
  
  protected buildDefaultProperties(): UserRegisterPageProperties {
    return {
      ...super.buildDefaultProperties(),
    };
  }

  protected buildActions(set: any): UserRegisterPageActions {
    return {
      ...super.buildActions(set),
    };
  }
}

const userRegisterPageStore = new UserRegisterPageStoreClass();
export type UserRegisterPageStore = UserRegisterPageProperties & UserRegisterPageActions;

/** 新規登録ページ状態管理ストア */
export const useUserRegisterPageStore = create<UserRegisterPageStore>()(
    (set) => userRegisterPageStore.createStore(set)
);
