import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useLoginHandler } from './useLoginHandler';
import { useParentLoginHandler } from './useParentLoginHandler';
import { useChildLoginHandler } from './useChildLoginHandler';
import { useCloseDialogHandler } from './useCloseDialogHandler';
import { useCreateUserHandler } from './useCreateFamilyHandler';
import { useForgotPasswordHandler } from './useForgotPasswordHandler';
import { useTermsOfServiceHandler } from './useTermsOfServiceHandler';
import { login } from '../services/login';
import { Session } from '../../../../core/constants/sessionVariables';
import { useLoginPageStore } from '../loginPageStore';
import { createAuthenticatedClient } from '../../../../core/api/trpcClient';

/** ログインページの全ハンドルを統合したカスタムフック
 * ログインページで使用する全てのイベントハンドルを一括で提供 */
export const loginPageHandlers = () => {
  const pageStore = useLoginPageStore();

  /** Email変更時のハンドル */
  const handleEmailChange = useEmailHandler({
    emailError: pageStore.errors.email,
    loginForm: pageStore.loginForm,
    setLoginForm: pageStore.setLoginForm,
    setEmailError: pageStore.setEmailError,
  });
  /** パスワード変更時のハンドル */
  const handlePasswordChange = usePasswordHandler({
    passwordError: pageStore.errors.password,
    loginForm: pageStore.loginForm,
    setLoginForm: pageStore.setLoginForm,
    setPasswordError: pageStore.setPasswordError,
  });
  /** ログイン押下時のハンドル */
  const handleLogin = useLoginHandler({
    clearErrors: pageStore.clearErrors,
    loginForm: pageStore.loginForm,
    currentLanguageType: Session.languageType,
    setEmailError: pageStore.setEmailError,
    setPasswordError: pageStore.setPasswordError,
    showDialog: pageStore.showDialog,
    setLoading: pageStore.setLoading,
    login: login,
    setSelectFamilyDialog: pageStore.setSelectFamilyDialog,
    createAuthenticatedClient: createAuthenticatedClient,
    getJwtToken: Session.jwtStorage.getToken,
  });
  /** 親ログイン時のハンドル */
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: Session.setFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    setLoginForm: pageStore.setLoginForm,
    setLoading: pageStore.setLoading,
  });
  /** 子ログイン時のハンドル */
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: Session.setFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    setLoginForm: pageStore.setLoginForm,
    setLoading: pageStore.setLoading,
  });
  /** ダイアログを閉じた時のハンドル */
  const handleCloseDialog = useCloseDialogHandler({
    hideDialog: pageStore.hideDialog,
  });
  /** ユーザー作成時のハンドル */
  const handleUserCreate = useCreateUserHandler({
    languageType: Session.languageType,
  });
  /** パスワードリセット押下時ハンドル */
  const handleForgotPassword = useForgotPasswordHandler({
    languageType: Session.languageType,
  });
  /** 利用規約押下時ハンドル */
  const handleTermsOfService = useTermsOfServiceHandler({
    languageType: Session.languageType,
  });

  return {
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleParentLogin,
    handleChildLogin,
    handleCloseDialog,
    handleUserCreate,
    handleForgotPassword,
    handleTermsOfService,
  };
};
