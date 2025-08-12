import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginForm, LoginFormData } from '../structure/loginForm';
import { SelectFamilyDialog, SelectFamilyDialogData } from '../structure/selectFamilyDialog';

/**
 * ログイン画面の状態インターフェース
 */
interface LoginPageState {
  // 状態
  isLoading: boolean;
  isDialogVisible: boolean;
  isValid: boolean;
  loginForm: LoginFormData;
  selectFamilyDialog: SelectFamilyDialogData;

  // アクション
  updateLoginForm: (form: LoginFormData) => void;
  updateSelectFamilyDialog: (dialog: SelectFamilyDialogData) => void;
  setLoading: (loading: boolean) => void;
  setDialogVisible: (visible: boolean) => void;
  resetState: () => void;

  // 計算済み値の取得
  getLoginFormObject: () => LoginForm | null;
  getSelectFamilyDialogObject: () => SelectFamilyDialog | null;
}

/**
 * 初期状態を作成
 */
const createInitialState = () => ({
  isLoading: false,
  isDialogVisible: false,
  isValid: false,
  loginForm: LoginForm.createInitialData(),
  selectFamilyDialog: SelectFamilyDialog.createInitialData()
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

      updateLoginForm: (form: LoginFormData) => {
        const isValid = calculateIsValid(form);
        set(
          { loginForm: form, isValid },
          false,
          'updateLoginForm'
        );
      },

      updateSelectFamilyDialog: (dialog: SelectFamilyDialogData) => {
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

      getLoginFormObject: () => {
        const state = get();
        return LoginForm.createSafely(state.loginForm);
      },

      getSelectFamilyDialogObject: () => {
        const state = get();
        return SelectFamilyDialog.createSafely(state.selectFamilyDialog);
      }
    }),
    {
      name: 'login-page-store',
    }
  )
);
