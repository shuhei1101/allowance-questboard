import { useCallback } from 'react';
import { LoginForm } from '../../models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { FormError, SetFormError, SetForm } from '../../../../../core/stores/baseFormStore';

/**
 * メール変更ハンドラーのカスタムフック
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 */
export const useEmailHandler = (params: {
  loginForm: LoginForm,
  setLoginForm: SetForm<LoginForm>,
  emailError: FormError,
  setEmailError: SetFormError
}) => {
  return useCallback((value: Email) => {
    const updatedForm = new LoginForm({ 
      email: value, 
      password: params.loginForm.password 
    });
    
    params.setLoginForm(updatedForm);
    
    if (params.emailError) {
      params.setEmailError(undefined);
    }
  }, [params.loginForm.password, params.setLoginForm, params.emailError, params.setEmailError]);
};
