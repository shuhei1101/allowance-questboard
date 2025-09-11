import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useUserRegisterHandler } from './useUserRegisterHandler';
import { Session } from '../../../../core/constants/sessionVariables';
import { UserRegisterFormStore } from '../stores/userRegisterFormStore';
import { UserRegisterPageStore } from '../stores/userRegisterPageStore';
import { useBeforeRemoveHandler } from './useBeforeRemoveHandler';

/** 新規登録ページの全ハンドラーを統合したカスタムフック
 *
 * 新規登録ページで使用する全てのイベントハンドラーを一括で提供 */
export const userRegisterRegisterPageHandlers = (params: {
  formStore: UserRegisterFormStore,
  pageStore: UserRegisterPageStore
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
    currentLanguageType: Session.languageType,
    setEmailError: params.formStore.setEmailError,
    setPasswordError: params.formStore.setPasswordError,
    setLoading: params.pageStore.setLoading,
    userRegisterForm: params.formStore.form,
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
