import { useCallback } from 'react';
import { SetUserCreateForm, SetEmailError, EmailError } from '../createUserPageStore';
import { UserCreateForm } from '../models/userCreateForm';
import { Email } from '@backend/features/auth/value-object/email';

export type UseEmailHandler = (params: {
  userCreateForm: UserCreateForm,
  setUserCreateForm: SetUserCreateForm,
  emailError: EmailError,
  setEmailError: SetEmailError
}) => (value: string) => void;

/** メール変更ハンドラーのカスタムフック
 *
 * メールアドレスの値を更新し、エラーをクリアする */
export const useEmailHandler: UseEmailHandler = (params) => {
  return useCallback((value: string) => {
    const updatedForm = new UserCreateForm({ 
      email: new Email(value), 
      password: params.userCreateForm.password 
    });
    
    params.setUserCreateForm(updatedForm);
    
    if (params.emailError) {
      params.setEmailError(undefined);
    }
  }, [params.userCreateForm.password, params.setUserCreateForm, params.emailError, params.setEmailError]);
};
