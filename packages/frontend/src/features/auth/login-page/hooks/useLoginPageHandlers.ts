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
    loginForm: pageStore.loginForm,
    updateLoginForm: pageStore.updateLoginForm,
  });
  const handlePasswordChange = usePasswordHandler({
    loginForm: pageStore.loginForm,
    updateLoginForm: pageStore.updateLoginForm,
  });
  const handleLogin = useLoginHandler({
    loginForm: pageStore.loginForm,
    currentLanguageType: sessionStore.languageType,
    showDialog: pageStore.showDialog,
    setLoading: pageStore.setLoading,
    login: login,
    updateSelectFamilyDialog: pageStore.updateSelectFamilyDialog,
    loginRouter: createAuthenticatedClient({
      jwtToken: sessionStore.jwt,
      languageType: sessionStore.languageType,
    }).login.login
  });
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: sessionStore.updateFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    updateLoginForm: pageStore.updateLoginForm,
    setLoading: pageStore.setLoading,
  });
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: sessionStore.updateFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    updateLoginForm: pageStore.updateLoginForm,
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
