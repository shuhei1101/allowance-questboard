import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginForm } from '../structure/loginForm';
import { SelectFamilyDialog } from '../structure/selectFamilyDialog';

/**
 * ログイン画面の状態インターフェース
 */
interface LoginPageState {
  // 状態
  isLoading: boolean;
  isDialogVisible: boolean;
  isValid: boolean;
  loginForm: LoginForm;
  selectFamilyDialog: SelectFamilyDialog;

  // アクション
  updateLoginForm: (form: LoginForm) => void;
  updateSelectFamilyDialog: (dialog: SelectFamilyDialog) => void;
  setLoading: (loading: boolean) => void;
  setDialogVisible: (visible: boolean) => void;
  resetState: () => void;
}

/**
 * 初期状態を作成
 */
const createInitialState = () => ({
  isLoading: false,
  isDialogVisible: false,
  isValid: false,
  loginForm: LoginForm.createDefault(),
  selectFamilyDialog: SelectFamilyDialog.createDefault()
});

/**
 * フォームのバリデーション状態を計算
 */
const calculateIsValid = (loginFormData: LoginFormData): boolean => {
  const loginForm = LoginForm.createSafely(loginFormData);
  return loginForm.isValid();
};

/**
 * ログイン画面状態管理ストア
 */
export const useLoginPageStore = create<LoginPageState>()(
  devtools(
    (set, get) => ({
      ...createInitialState(),

      updateLoginForm: (form: LoginForm) => {
        const isValid = calculateIsValid(form);
        set(
          { loginForm: form, isValid },
          false,
          'updateLoginForm'
        );
      },

      updateSelectFamilyDialog: (dialog: SelectFamilyDialog) => {
        set(
          { selectFamilyDialog: dialog },
          false,
          'updateSelectFamilyDialog'
        );
      },

      setLoading: (loading: boolean) => {
        set(
          { isLoading: loading },
          false,
          'setLoading'
        );
      },

      setDialogVisible: (visible: boolean) => {
        set(
          { isDialogVisible: visible },
          false,
          'setDialogVisible'
        );
      },

      resetState: () => {
        set(
          createInitialState(),
          false,
          'resetState'
        );
      },

    }),
    {
      name: 'login-page-store',
    }
  )
);
