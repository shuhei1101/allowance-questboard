import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useCreateUserHandler } from './useCreateUserHandler';
import { useCreateUserPageStore } from '../createUserPageStore';
import { Session } from '../../../../core/constants/sessionVariables';

export type CreateUserPageHandlers = {
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleUserCreate: () => Promise<void>;
};

/** 新規登録ページの全ハンドラーを統合したカスタムフック
 *
 * 新規登録ページで使用する全てのイベントハンドラーを一括で提供 */
export const createUserPageHandlers = (): CreateUserPageHandlers => {
  const pageStore = useCreateUserPageStore();

  const handleEmailChange = useEmailHandler({
    emailError: pageStore.errors.email,
    userCreateForm: pageStore.userCreateForm,
    setUserCreateForm: pageStore.setUserCreateForm,
    setEmailError: pageStore.setEmailError,
  });

  const handlePasswordChange = usePasswordHandler({
    passwordError: pageStore.errors.password,
    userCreateForm: pageStore.userCreateForm,
    setUserCreateForm: pageStore.setUserCreateForm,
    setPasswordError: pageStore.setPasswordError,
  });

  const handleUserCreate = useCreateUserHandler({
    clearErrors: pageStore.clearErrors,
    userCreateForm: pageStore.userCreateForm,
    currentLanguageType: Session.languageType,
    setEmailError: pageStore.setEmailError,
    setPasswordError: pageStore.setPasswordError,
    setLoading: pageStore.setLoading,
  });

  return {
    handleEmailChange,
    handlePasswordChange,
    handleUserCreate,
  };
};
