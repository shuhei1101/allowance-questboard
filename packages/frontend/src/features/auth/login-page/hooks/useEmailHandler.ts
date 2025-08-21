import { useCallback } from 'react';
import { UpdateLoginForm, GetEmailError } from '../stores/loginPageStore';
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
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      email: new Email(value), 
      ...params.loginForm
    });
    
    params.updateLoginForm(updatedForm);
    
  }, [params.updateLoginForm]);
};
