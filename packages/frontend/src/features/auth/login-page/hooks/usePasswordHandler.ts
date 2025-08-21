import { useCallback } from 'react';
import { GetPasswordError, UpdateLoginForm } from '../stores/loginPageStore';
import { LoginForm } from '../models/loginForm';
import { Password } from '@backend/features/auth/value-object/password';

/**
 * パスワード変更ハンドラーのカスタムフック
 * 
 * パスワードの値を更新し、エラーをクリアする
 */
export const usePasswordHandler = (params: {
  loginForm: LoginForm,
  updateLoginForm: UpdateLoginForm,
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      password: new Password(value),
      ...params.loginForm
    });
    
    params.updateLoginForm(updatedForm);
    
  }, [params.updateLoginForm]);
};
