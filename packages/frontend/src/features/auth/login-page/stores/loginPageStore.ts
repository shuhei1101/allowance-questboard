// import { create, StoreApi } from 'zustand';
// import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';

// interface LoginPageProperties extends BasePageProperties {
// }

// interface LoginPageActions extends BasePageActions {
// }

// class LoginPageStoreClass extends BasePageStore<LoginPageProperties, LoginPageActions> {
  
//   protected buildDefaultProperties(): LoginPageProperties {
//     return {
//       ...super.buildDefaultProperties(),
//     };
//   }

//   protected buildActions(
//     set: StoreApi<LoginPageProperties & BasePageActions & LoginPageActions>['setState'],
//     get: StoreApi<LoginPageProperties & BasePageActions & LoginPageActions>['getState']
//   ): LoginPageActions {
//     return {
//       ...super.buildActions(set, get),
//     };
//   }
// }

// const loginPageStore = new LoginPageStoreClass();
// export type LoginPageStore = LoginPageProperties & LoginPageActions;

// /** ログインページ状態管理ストア */
// export const useLoginPageStore = create<LoginPageStore>()(
//     (set, get) => loginPageStore.createStore(set, get)
// );
