import { useCallback } from 'react';
import { UpdateLoginForm, SetEmailError, EmailError } from '../stores/loginPageStore';
import { LoginForm } from '../models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';

/**
 * メール変更ハンドラーのカスタムフック
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 */
export const useEmailHandler = (params: {
  loginForm: LoginForm,
  updateLoginForm: UpdateLoginForm,
  emailError: EmailError,
  setEmailError: SetEmailError
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      email: new Email(value), 
      password: params.loginForm.password 
    });
    
    params.updateLoginForm(updatedForm);
    
    if (params.emailError) {
      params.setEmailError(null);
    }
  }, [params.loginForm.password, params.updateLoginForm, params.emailError, params.setEmailError]);
};
