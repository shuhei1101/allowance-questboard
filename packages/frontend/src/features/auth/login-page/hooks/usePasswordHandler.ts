import { useCallback } from 'react';
import { UpdateLoginForm, SetPasswordError, PasswordError } from '../stores/loginPageStore';
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
  passwordError: PasswordError,
  setPasswordError: SetPasswordError
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      password: new Password(value),
      ...params.loginForm
    });
    
    params.updateLoginForm(updatedForm);
    
    if (params.passwordError) {
      params.setPasswordError(null);
    }
  }, [params.loginForm.email, params.updateLoginForm, params.passwordError, params.setPasswordError]);
};
