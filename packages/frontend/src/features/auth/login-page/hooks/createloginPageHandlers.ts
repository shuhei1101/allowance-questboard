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
import { LoginPageStore } from '../stores/loginPageStore';
import { createAuthenticatedClient } from '../../../../core/api/trpcClient';
import { LoginFormStore } from '../stores/loginFormStore';

/** ログインページの全ハンドルを統合したカスタムフック
 * ログインページで使用する全てのイベントハンドルを一括で提供 */
export const createLoginPageHandlers = (params: {
  pageStore: LoginPageStore,
  loginFormStore: LoginFormStore,
}) => {
  /** Email変更時のハンドル */
  const handleEmailChange = useEmailHandler({
    emailError: params.loginFormStore.errors.email,
    loginForm: params.loginFormStore.form,
    setLoginForm: params.loginFormStore.setLoginForm,
    setEmailError: params.loginFormStore.setEmailError,
  });
  /** パスワード変更時のハンドル */
  const handlePasswordChange = usePasswordHandler({
    passwordError: params.loginFormStore.errors.password,
    loginForm: params.loginFormStore.form,
    setLoginForm: params.loginFormStore.setLoginForm,
    setPasswordError: params.loginFormStore.setPasswordError,
  });
  /** ログイン押下時のハンドル */
  const handleLogin = useLoginHandler({
    clearErrors: params.pageStore.clearErrors,
    loginForm: params.loginFormStore.form,
    currentLanguageType: Session.languageType,
    setEmailError: params.pageStore.setEmailError,
    setPasswordError: params.pageStore.setPasswordError,
    showDialog: params.pageStore.showDialog,
    setLoading: params.pageStore.setLoading,
    login: login,
    setSelectFamilyDialog: params.pageStore.setSelectFamilyDialog,
    createAuthenticatedClient: createAuthenticatedClient,
    Jwt: params.pageStore.jwt,
  });
  /** 親ログイン時のハンドル */
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: Session.setFamilyMemberType,
    hideDialog: params.pageStore.hideDialog,
    setLoginForm: params.pageStore.setLoginForm,
    setLoading: params.pageStore.setLoading,
  });
  /** 子ログイン時のハンドル */
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: Session.setFamilyMemberType,
    hideDialog: params.pageStore.hideDialog,
    setLoginForm: params.pageStore.setLoginForm,
    setLoading: params.pageStore.setLoading,
  });
  /** ダイアログを閉じた時のハンドル */
  const handleCloseDialog = useCloseDialogHandler({
    hideDialog: params.pageStore.hideDialog,
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
