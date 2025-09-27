import { useEmailHandler } from './handlers/useEmailHandler';
import { useLoginHandler } from './handlers/useLoginHandler';
import { useRegisterUserHandler } from './handlers/useRegisterUserHandler';
import { useForgotPasswordHandler } from './handlers/useForgotPasswordHandler';
import { useTermsOfServiceHandler } from './handlers/useTermsOfServiceHandler';
import { login } from '../services/login';
import { createAuthenticatedClient } from '../../../../core/api/trpcClient';
import { LoginFormStore } from '../stores/loginFormStore';
import { SessionStore } from '../../../../core/constants/sessionStore';
import { usePasswordHandler } from './handlers/usePasswordHandler';
import { SetJwtToken } from '../../services/jwtStorage';

/** ログインページの全ハンドルを統合したカスタムフック
 * ログインページで使用する全てのイベントハンドルを一括で提供 */
export const createLoginPageHandlers = (params: {
  formStore: LoginFormStore,
  sessionStore: SessionStore,
  setJwtToken: SetJwtToken,
  setLoading: (loading: boolean) => void,
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
    setLoading: params.setLoading,
    login: login,
    createAuthenticatedClient: createAuthenticatedClient,
    setJwtToken: params.setJwtToken
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
    handleUserCreate,
    handleForgotPassword,
    handleTermsOfService,
  };
};
