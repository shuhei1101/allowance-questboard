import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useLoginHandler } from './useLoginHandler';
import { useParentLoginHandler } from './useParentLoginHandler';
import { useChildLoginHandler } from './useChildLoginHandler';
import { useCloseDialogHandler } from './useCloseDialogHandler';
import { useRegisterUserHandler } from './useCreateFamilyHandler';
import { useForgotPasswordHandler } from './useForgotPasswordHandler';
import { useTermsOfServiceHandler } from './useTermsOfServiceHandler';
import { login } from '../services/login';
import { LoginPageStore } from '../stores/loginPageStore';
import { createAuthenticatedClient } from '../../../../core/api/trpcClient';
import { LoginFormStore } from '../stores/loginFormStore';
import { SessionStore } from '../../../../core/constants/sessionStore';

/** ログインページの全ハンドルを統合したカスタムフック
 * ログインページで使用する全てのイベントハンドルを一括で提供 */
export const createLoginPageHandlers = (params: {
  pageStore: LoginPageStore,
  formStore: LoginFormStore,
  sessionStore: SessionStore
}) => {
  /** Email変更時のハンドル */
  const handleEmailChange = useEmailHandler({
    emailError: params.formStore.errors.email,
    loginForm: params.formStore.form,
    setLoginForm: params.formStore.setForm,
    setEmailError: params.formStore.setEmailError,
  });
  /** パスワード変更時のハンドル */
  const handlePasswordChange = usePasswordHandler({
    passwordError: params.formStore.errors.password,
    loginForm: params.formStore.form,
    setLoginForm: params.formStore.setForm,
    setPasswordError: params.formStore.setPasswordError,
  });
  /** ログイン押下時のハンドル */
  const handleLogin = useLoginHandler({
    clearErrors: params.formStore.clearErrors,
    loginForm: params.formStore.form,
    currentLanguageType: params.sessionStore.languageType,
    setEmailError: params.formStore.setEmailError,
    setPasswordError: params.formStore.setPasswordError,
    showDialog: params.pageStore.showDialog,
    setLoading: params.pageStore.setLoading,
    login: login,
    setSelectFamilyDialog: params.pageStore.setSelectFamilyDialog,
    createAuthenticatedClient: createAuthenticatedClient,
    Jwt: params.pageStore.jwt,
  });
  /** 親ログイン時のハンドル */
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: params.sessionStore.setFamilyMemberType,
    hideDialog: params.pageStore.hideDialog,
    setLoginForm: params.formStore.setForm,
    setLoading: params.pageStore.setLoading,
  });
  /** 子ログイン時のハンドル */
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: params.sessionStore.setFamilyMemberType,
    hideDialog: params.pageStore.hideDialog,
    setLoginForm: params.formStore.setForm,
    setLoading: params.pageStore.setLoading,
  });
  /** ダイアログを閉じた時のハンドル */
  const handleCloseDialog = useCloseDialogHandler({
    hideDialog: params.pageStore.hideDialog,
  });
  /** ユーザー作成時のハンドル */
  const handleUserCreate = useRegisterUserHandler({
    languageType: params.sessionStore.languageType,
  });
  /** パスワードリセット押下時ハンドル */
  const handleForgotPassword = useForgotPasswordHandler({
    languageType: params.sessionStore.languageType,
  });
  /** 利用規約押下時ハンドル */
  const handleTermsOfService = useTermsOfServiceHandler({
    languageType: params.sessionStore.languageType,
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
