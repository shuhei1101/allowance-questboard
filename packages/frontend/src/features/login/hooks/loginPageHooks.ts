import { useLoginPageStore } from '../store/loginPageStore';
import { LoginForm } from '../structure/loginForm';
import { SelectFamilyDialog } from '../structure/selectFamilyDialog';

/**
 * ログイン画面状態管理のセレクター・ヘルパー関数
 */

/**
 * ログインフォーム値オブジェクト取得
 */
export const useLoginFormObject = () => {
  return useLoginPageStore(state => state.getLoginFormObject());
};

/**
 * 家族選択ダイアログ値オブジェクト取得
 */
export const useSelectFamilyDialogObject = () => {
  return useLoginPageStore(state => state.getSelectFamilyDialogObject());
};

/**
 * フォームバリデーション状態取得
 */
export const useIsFormValid = () => useLoginPageStore(state => state.isValid);

/**
 * ローディング状態のセレクター
 */
export const useIsLoading = () => useLoginPageStore(state => state.isLoading);

/**
 * ダイアログ表示状態のセレクター
 */
export const useIsDialogVisible = () => useLoginPageStore(state => state.isDialogVisible);

/**
 * ログインフォーム生データのセレクター
 */
export const useLoginFormData = () => useLoginPageStore(state => state.loginForm);

/**
 * 家族選択ダイアログデータのセレクター
 */
export const useSelectFamilyDialogData = () => useLoginPageStore(state => state.selectFamilyDialog);

/**
 * ログインフォーム更新アクション
 */
export const useUpdateLoginForm = () => useLoginPageStore(state => state.updateLoginForm);

/**
 * 家族選択ダイアログデータ更新アクション
 */
export const useUpdateSelectFamilyDialog = () => useLoginPageStore(state => state.updateSelectFamilyDialog);

/**
 * ローディング状態更新アクション
 */
export const useSetLoading = () => useLoginPageStore(state => state.setLoading);

/**
 * ダイアログ表示状態更新アクション
 */
export const useSetDialogVisible = () => useLoginPageStore(state => state.setDialogVisible);

/**
 * 状態リセットアクション
 */
export const useResetLoginState = () => useLoginPageStore(state => state.resetState);

/**
 * 総合的なフォーム状態
 */
export const useLoginFormState = () => {
  const formObject = useLoginFormObject();
  const isValid = useIsFormValid();
  
  return {
    loginForm: formObject,
    isValid,
    canLogin: isValid && formObject !== null && formObject.isValid()
  };
};
