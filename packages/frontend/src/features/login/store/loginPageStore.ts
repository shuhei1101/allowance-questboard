import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginForm } from '../models/loginForm';
import { SelectFamilyDialog } from '../models/selectFamilyDialog';

interface LoginPageState {
  isLoading: boolean;
  isDialogVisible: boolean;
  loginForm: LoginForm;
  selectFamilyDialog: SelectFamilyDialog;
  emailError: string | null;
  passwordError: string | null;

  updateLoginForm: (form: LoginForm) => void;
  updateSelectFamilyDialog: (dialog: SelectFamilyDialog) => void;
  showDialog: () => void;
  hideDialog: () => void;
  setLoading: (loading: boolean) => void;
  setEmailError: (error: string | null) => void;
  setPasswordError: (error: string | null) => void;
  clearErrors: () => void;
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
      emailError: null,
      passwordError: null,

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

      setEmailError: (error: string | null) => {
        set({ emailError: error }, false, 'setEmailError');
      },

      setPasswordError: (error: string | null) => {
        set({ passwordError: error }, false, 'setPasswordError');
      },

      clearErrors: () => {
        set({ emailError: null, passwordError: null }, false, 'clearErrors');
      },
    }),
    {
      name: 'login-page-store',
    }
  )
);
