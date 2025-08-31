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
import { createAuthenticatedClient } from '@/core/api/trpcClient';
import { JwtStorage } from '../../services/jwtStorage';
import { Session } from '../../../../core/constants/sessionVariables';
import { useLoginPageStore } from '../loginPageStore';

/** ログインページの全ハンドラーを統合したカスタムフック
 * ログインページで使用する全てのイベントハンドラーを一括で提供 */
export const loginPageHandlers = async () => {
  const pageStore = useLoginPageStore();
  const router = createAuthenticatedClient({
    jwtToken: await JwtStorage.getToken(),
    languageType: Session.languageType,
  });
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
    currentLanguageType: Session.languageType,
    setEmailError: pageStore.setEmailError,
    setPasswordError: pageStore.setPasswordError,
    showDialog: pageStore.showDialog,
    setLoading: pageStore.setLoading,
    login: login,
    setSelectFamilyDialog: pageStore.setSelectFamilyDialog,
    loginHandler: router.login.login,
  });
  const handleParentLogin = useParentLoginHandler({
    updateFamilyMemberType: Session.setFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    setLoginForm: pageStore.setLoginForm,
    setLoading: pageStore.setLoading,
  });
  const handleChildLogin = useChildLoginHandler({
    updateFamilyMemberType: Session.setFamilyMemberType,
    hideDialog: pageStore.hideDialog,
    setLoginForm: pageStore.setLoginForm,
    setLoading: pageStore.setLoading,
  });
  const handleCloseDialog = useCloseDialogHandler({
    hideDialog: pageStore.hideDialog,
  });
  const handleUserFamily = useCreateUserHandler({
    languageType: Session.languageType,
  });
  const handleForgotPassword = useForgotPasswordHandler({
    languageType: Session.languageType,
  });
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
    handleCreateFamily: handleUserFamily,
    handleForgotPassword,
    handleTermsOfService,
  };
};
