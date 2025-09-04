import { create } from 'zustand';
import { BasePageStore, BasePageProperties, BasePageActions } from '../../../../core/stores/basePageStore';
import { SelectFamilyDialog } from '../models/selectFamilyDialog';

// シグネチャ
export type IsDialogVisible = boolean;
export type SetSelectFamilyDialog = (dialog: SelectFamilyDialog) => void;
export type ShowDialog = () => void;
export type HideDialog = () => void;

interface LoginPageProperties extends BasePageProperties {
  isDialogVisible: IsDialogVisible;
  selectFamilyDialog: SelectFamilyDialog;
}

interface LoginPageActions extends BasePageActions {
  setSelectFamilyDialog: SetSelectFamilyDialog;
  showDialog: ShowDialog;
  hideDialog: HideDialog;
}

class LoginPageStoreClass extends BasePageStore<LoginPageProperties, LoginPageActions> {
  
  protected buildDefaultProperties(): LoginPageProperties {
    return {
      ...super.buildDefaultProperties(),
      isDialogVisible: false,
      selectFamilyDialog: SelectFamilyDialog.initialize(),
    };
  }

  /** setSelectFamilyDialogアクションを生成 */
  protected setSelectFamilyDialog(set: any): SetSelectFamilyDialog {
    return (dialog: SelectFamilyDialog) => set({ selectFamilyDialog: dialog }, false, 'setSelectFamilyDialog');
  }

  /** showDialogアクションを生成 */
  protected showDialog(set: any): ShowDialog {
    return () => set({ isDialogVisible: true }, false, 'showDialog');
  }

  /** hideDialogアクションを生成 */
  protected hideDialog(set: any): HideDialog {
    return () => set({ isDialogVisible: false }, false, 'hideDialog');
  }

  protected buildActions(set: any): LoginPageActions {
    return {
      ...super.buildActions(set),
      setSelectFamilyDialog: this.setSelectFamilyDialog(set),
      showDialog: this.showDialog(set),
      hideDialog: this.hideDialog(set),
    };
  }
}

const loginPageStore = new LoginPageStoreClass();
export type LoginPageStore = LoginPageProperties & LoginPageActions;

/** ログインページ状態管理ストア */
export const useLoginPageStore = create<LoginPageStore>()(
    (set) => loginPageStore.createStore(set)
);
