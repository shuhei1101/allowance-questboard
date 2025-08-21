import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginForm } from '../models/loginForm';
import { SelectFamilyDialog } from '../models/selectFamilyDialog';

export type IsLoading = boolean;
export type IsDialogVisible = boolean;

export type UpdateLoginForm = (form: LoginForm) => void;
export type UpdateSelectFamilyDialog = (dialog: SelectFamilyDialog) => void;
export type ShowDialog = () => void;
export type HideDialog = () => void;
export type SetLoading = (loading: boolean) => void;
export type GetEmailError = () => string | undefined;
export type GetPasswordError = () => string | undefined;

interface LoginPageState {
  isLoading: IsLoading;
  isDialogVisible: IsDialogVisible;
  loginForm: LoginForm;
  selectFamilyDialog: SelectFamilyDialog;
  getEmailError: GetEmailError;
  getPasswordError: GetPasswordError;

  updateLoginForm: UpdateLoginForm;
  updateSelectFamilyDialog: UpdateSelectFamilyDialog;
  showDialog: ShowDialog;
  hideDialog: HideDialog;
  setLoading: SetLoading;
}

/**
 * ログイン画面状態管理ストア
 */
export const useLoginPageStore = create<LoginPageState>()(
  devtools(
    (set, get) => ({
      isLoading: false,
      isDialogVisible: false,
      loginForm: LoginForm.initialize(),
      selectFamilyDialog: SelectFamilyDialog.initialize(),

      updateLoginForm: (loginForm: LoginForm) => {
        set({ loginForm }, false, 'updateLoginForm');
      },

      updateSelectFamilyDialog: (dialog: SelectFamilyDialog) => {
        set({ selectFamilyDialog: dialog }, false, 'updateSelectFamilyDialog');
      },

      showDialog: () => {
        set({ isDialogVisible: true }, false, 'showDialog');
      },

      hideDialog: () => {
        set({ isDialogVisible: false }, false, 'hideDialog');
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },
      getEmailError: () => {
        return get().loginForm.email.errorMessage
      },
      getPasswordError: () => {
        return get().loginForm.password.errorMessage;
      },
    }),
    {
      name: 'login-page-store',
    }
  )
);
