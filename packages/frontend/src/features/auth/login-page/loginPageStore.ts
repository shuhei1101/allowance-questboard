import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginForm } from './models/loginForm';
import { SelectFamilyDialog } from './models/selectFamilyDialog';

export type IsLoading = boolean;
export type IsDialogVisible = boolean;
export type EmailError = string | undefined;
export type PasswordError = string | undefined;

export type SetLoginForm = (form: LoginForm) => void;
export type SetSelectFamilyDialog = (dialog: SelectFamilyDialog) => void;
export type ShowDialog = () => void;
export type HideDialog = () => void;
export type SetLoading = (loading: boolean) => void;
export type SetEmailError = (error: string | undefined) => void;
export type SetPasswordError = (error: string | undefined) => void;
export type ClearErrors = () => void;

interface LoginPageState {
  isLoading: IsLoading;
  isDialogVisible: IsDialogVisible;
  loginForm: LoginForm;
  selectFamilyDialog: SelectFamilyDialog;
  emailError?: EmailError;
  passwordError?: PasswordError;

  setLoginForm: SetLoginForm;
  setSelectFamilyDialog: SetSelectFamilyDialog;
  showDialog: ShowDialog;
  hideDialog: HideDialog;
  setLoading: SetLoading;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  clearErrors: ClearErrors;
}

/**
 * ログイン画面状態管理ストア
 */
export const useLoginPageStore = create<LoginPageState>()(
  devtools(
    (set) => ({
      isLoading: false,
      isDialogVisible: false,
      loginForm: LoginForm.initialize(),
      selectFamilyDialog: SelectFamilyDialog.initialize(),
      emailError: undefined,
      passwordError: undefined,

      setLoginForm: (loginForm: LoginForm) => {
        set({ loginForm }, false, 'setLoginForm');
      },

      setSelectFamilyDialog: (dialog: SelectFamilyDialog) => {
        set({ selectFamilyDialog: dialog }, false, 'setSelectFamilyDialog');
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

      setEmailError: (error: string | undefined) => {
        set({ emailError: error }, false, 'setEmailError');
      },

      setPasswordError: (error: string | undefined) => {
        set({ passwordError: error }, false, 'setPasswordError');
      },

      clearErrors: () => {
        set({ emailError: undefined, passwordError: undefined }, false, 'clearErrors');
      },
    }),
    {
      name: 'login-page-store',
    }
  )
);
