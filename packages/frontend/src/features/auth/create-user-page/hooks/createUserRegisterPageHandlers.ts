import { useEmailHandler } from './handlers/useEmailHandler';
import { usePasswordHandler } from './handlers/usePasswordHandler';
import { useUserRegisterHandler } from './handlers/useUserRegisterHandler';
import { UserRegisterFormStore } from '../stores/userRegisterFormStore';
import { useBeforeRemoveHandler } from './handlers/useBeforeRemoveHandler';
import { SessionStore } from '../../../../core/constants/sessionStore';
import { LoginFormStore } from '../../login-page/stores/loginFormStore';

/** 新規登録ページの全ハンドラーを統合したカスタムフック
 *
 * 新規登録ページで使用する全てのイベントハンドラーを一括で提供 */
export const userRegisterRegisterPageHandlers = (params: {
  formStore: UserRegisterFormStore,
  sessionStore: SessionStore,
  loginFormStore: LoginFormStore,
  setLoading: (loading: boolean) => void;
}) => {

  const handleEmailChange = useEmailHandler({
    emailError: params.formStore.errors.email,
    setEmailError: params.formStore.setEmailError,
    setUserRegisterForm: params.formStore.setForm,
    userRegisterForm: params.formStore.form,
  });

  const handlePasswordChange = usePasswordHandler({
    passwordError: params.formStore.errors.password,
    userRegisterForm: params.formStore.form,
    setUserRegisterForm: params.formStore.setForm,
    setPasswordError: params.formStore.setPasswordError,
  });

  const handleUserRegister = useUserRegisterHandler({
    clearErrors: params.formStore.clearErrors,
    currentLanguageType: params.sessionStore.languageType,
    setEmailError: params.formStore.setEmailError,
    setPasswordError: params.formStore.setPasswordError,
    setLoading: params.setLoading,
    userRegisterForm: params.formStore.form,
    setLoginForm: params.loginFormStore.setForm
  });

  const handleBeforeRemove = useBeforeRemoveHandler({
    userRegisterForm: params.formStore.form,
  });

  return {
    handleEmailChange,
    handlePasswordChange,
    handleUserRegister,
    handleBeforeRemove,
  };
};
