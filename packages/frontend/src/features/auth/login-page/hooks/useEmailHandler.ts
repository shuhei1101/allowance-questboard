import { useCallback } from 'react';
import { SetLoginForm, SetEmailError, EmailError } from '../stores/loginPageStore';
import { LoginForm } from '../models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';

/**
 * メール変更ハンドラーのカスタムフック
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 */
export const useEmailHandler = (params: {
  loginForm: LoginForm,
  setLoginForm: SetLoginForm,
  emailError: EmailError,
  setEmailError: SetEmailError
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      email: new Email(value), 
      password: params.loginForm.password 
    });
    
    params.setLoginForm(updatedForm);
    
    if (params.emailError) {
      params.setEmailError(undefined);
    }
  }, [params.loginForm.password, params.setLoginForm, params.emailError, params.setEmailError]);
};
