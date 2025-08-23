import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useLoginHandler } from './useLoginHandler';
import { useParentLoginHandler } from './useParentLoginHandler';
import { useChildLoginHandler } from './useChildLoginHandler';
import { useCloseDialogHandler } from './useCloseDialogHandler';
import { useCreateFamilyHandler } from './useCreateFamilyHandler';
import { useForgotPasswordHandler } from './useForgotPasswordHandler';
import { useTermsOfServiceHandler } from './useTermsOfServiceHandler';
import { useLoginPageStore } from '../stores/loginPageStore';
import { useSessionStore } from '../../stores/sessionStore';
import { login } from '../services/login';
import { createAuthenticatedClient } from '@/core/api/trpcClient';

/**
 * ログインページの全ハンドラーを統合したカスタムフック
 * 
 * ログインページで使用する全てのイベントハンドラーを一括で提供
 */
export const useLoginPageHandlers = () => {
  const pageStore = useLoginPageStore();
  const sessionStore = useSessionStore();
  const handleEmailChange = useEmailHandler({
    emailError: pageStore.emailError,
    loginForm: pageStore.loginForm,
    setLoginForm: pageStore.setLoginForm,
    setEmailError: pageStore.setEmailError,
  });
  const handlePasswordChange = usePasswordHandler({
    passwordError: pageStore.passwordError,
    loginForm: pageStore.loginForm,
    setLoginForm: pageStore.setLoginForm,
    setPasswordError: pageStore.setPasswordError,
  });
  const handleLogin = useLoginHandler({
    clearErrors: pageStore.clearErrors,
    loginForm: pageStore.loginForm,
    currentLanguageType: sessionStore.languageType,
    setEmailError: pageStore.setEmailError,
    setPasswordError: pageStore.setPasswordError,
    showDialog: pageStore.showDialog,
    setLoading: pageStore.setLoading,
    login: login,
    setSelectFamilyDialog: pageStore.setSelectFamilyDialog,
    loginHandler: createAuthenticatedClient({
      jwtToken: sessionStore.jwt,
      languageType: sessionStore.languageType,
    }).login.login,
  });
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: sessionStore.setFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    setLoginForm: pageStore.setLoginForm,
    setLoading: pageStore.setLoading,
  });
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: sessionStore.setFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    setLoginForm: pageStore.setLoginForm,
    setLoading: pageStore.setLoading,
  });
  const handleCloseDialog = useCloseDialogHandler({
    hideDialog: pageStore.hideDialog,
  });
  const handleCreateFamily = useCreateFamilyHandler();
  const handleForgotPassword = useForgotPasswordHandler();
  const handleTermsOfService = useTermsOfServiceHandler();

  return {
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleParentLogin,
    handleChildLogin,
    handleCloseDialog,
    handleCreateFamily,
    handleForgotPassword,
    handleTermsOfService,
  };
};
