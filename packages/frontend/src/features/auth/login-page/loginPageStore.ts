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
export type Reset = () => void;

interface FormErrors {
  email?: string;
  password?: string;
}

interface Properties {
  isLoading: IsLoading;
  isDialogVisible: IsDialogVisible;
  loginForm: LoginForm;
  selectFamilyDialog: SelectFamilyDialog;
  errors: FormErrors;
}

const defaultProperties: Properties = {
  isLoading: false,
  isDialogVisible: false,
  loginForm: LoginForm.initialize(),
  selectFamilyDialog: SelectFamilyDialog.initialize(),
  errors: {
    email: undefined,
    password: undefined,
  },
};

interface LoginPageState extends Properties {
  setLoginForm: SetLoginForm;
  setSelectFamilyDialog: SetSelectFamilyDialog;
  showDialog: ShowDialog;
  hideDialog: HideDialog;
  setLoading: SetLoading;
  setEmailError: SetEmailError;
  setPasswordError: SetPasswordError;
  clearErrors: ClearErrors;
  reset: Reset;
}


/**
 * ログイン画面状態管理ストア
 */
export const createLoginPageStore = create<LoginPageState>()(
  devtools(
    (set) => ({
      ...defaultProperties,

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
        set((state) => ({ errors: { ...state.errors, email: error } }), false, 'setEmailError');
      },

      setPasswordError: (error: string | undefined) => {
        set((state) => ({ errors: { ...state.errors, password: error } }), false, 'setPasswordError');
      },

      clearErrors: () => {
        set({ errors: {} }, false, 'clearErrors');
      },

      reset: () => {
        set({ ...defaultProperties }, false, 'reset');
      },
    }),
    {
      name: 'login-page-store',
    }
  )
);
