import { useCallback } from 'react';
import { SetUserCreateForm, SetPasswordError, PasswordError } from '../createUserPageStore';
import { UserCreateForm } from '../models/userCreateForm';
import { Password } from '@backend/features/auth/value-object/password';

export type UsePasswordHandler = (params: {
  userCreateForm: UserCreateForm,
  setUserCreateForm: SetUserCreateForm,
  passwordError: PasswordError,
  setPasswordError: SetPasswordError
}) => (value: string) => void;

/** パスワード変更ハンドラーのカスタムフック
 *
 * パスワードの値を更新し、エラーをクリアする */
export const usePasswordHandler: UsePasswordHandler = (params) => {
  return useCallback((value: string) => {
    const updatedForm = new UserCreateForm({ 
      email: params.userCreateForm.email,
      password: new Password(value)
    });
    
    params.setUserCreateForm(updatedForm);
    
    if (params.passwordError) {
      params.setPasswordError(undefined);
    }
  }, [params.userCreateForm.email, params.setUserCreateForm, params.passwordError, params.setPasswordError]);
};
