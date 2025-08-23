import { useCallback } from 'react';
import { SetLoginForm, SetPasswordError, PasswordError } from '../stores/loginPageStore';
import { LoginForm } from '../models/loginForm';
import { Password } from '@backend/features/auth/value-object/password';

/**
 * パスワード変更ハンドラーのカスタムフック
 * 
 * パスワードの値を更新し、エラーをクリアする
 */
export const usePasswordHandler = (params: {
  loginForm: LoginForm,
  setLoginForm: SetLoginForm,
  passwordError: PasswordError,
  setPasswordError: SetPasswordError
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      password: new Password(value),
      ...params.loginForm
    });
    
    params.setLoginForm(updatedForm);
    
    if (params.passwordError) {
      params.setPasswordError(null);
    }
  }, [params.loginForm.email, params.setLoginForm, params.passwordError, params.setPasswordError]);
};
