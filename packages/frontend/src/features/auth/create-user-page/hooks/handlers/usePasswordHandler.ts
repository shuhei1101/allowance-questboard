import { useCallback } from 'react';
import { UserRegisterForm } from '../../models/userRegisterForm';
import { Password } from '@backend/features/auth/value-object/password';
import { FormError, SetForm, SetFormError } from '../../../../../core/stores/baseFormStore';

export type UsePasswordHandler = (params: {
  userRegisterForm: UserRegisterForm,
  setUserRegisterForm: SetForm<UserRegisterForm>,
  passwordError: FormError,
  setPasswordError: SetFormError
}) => (value: Password) => void;

/** パスワード変更ハンドラーのカスタムフック
 *
 * パスワードの値を更新し、エラーをクリアする */
export const usePasswordHandler: UsePasswordHandler = (params) => {
  return useCallback((value: Password) => {
    const updatedForm = new UserRegisterForm({
      email: params.userRegisterForm.email,
      password: value
    });

    params.setUserRegisterForm(updatedForm);

    if (params.passwordError) {
      params.setPasswordError(undefined);
    }
  }, [params.userRegisterForm.email, params.setUserRegisterForm, params.passwordError, params.setPasswordError]);
};
