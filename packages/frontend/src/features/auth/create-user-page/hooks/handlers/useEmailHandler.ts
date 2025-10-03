import { useCallback } from 'react';
import { UserRegisterForm } from '../../models/userRegisterForm';
import { Email } from '@backend/features/auth/value-object/email';
import { FormError, SetForm, SetFormError } from '../../../../../core/stores/baseFormStore';

export type UseEmailHandler = (params: {
  userRegisterForm: UserRegisterForm,
  setUserRegisterForm: SetForm<UserRegisterForm>,
  emailError: FormError,
  setEmailError: SetFormError
}) => (value: Email) => void;

/** メール変更ハンドラーのカスタムフック
 *
 * メールアドレスの値を更新し、エラーをクリアする */
export const useEmailHandler: UseEmailHandler = (params) => {
  return useCallback((value: Email) => {
    const updatedForm = new UserRegisterForm({ 
      email: value, 
      password: params.userRegisterForm.password 
    });

    params.setUserRegisterForm(updatedForm);

    if (params.emailError) {
      params.setEmailError(undefined);
    }
  }, [params.userRegisterForm.password, params.setUserRegisterForm, params.emailError, params.setEmailError]);
};
