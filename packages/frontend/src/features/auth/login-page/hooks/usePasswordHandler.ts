import { useCallback } from 'react';
import { LoginForm } from '../models/loginForm';
import { Password } from '@backend/features/auth/value-object/password';
import { SetForm } from '../../../../core/stores/baseFormStore';

/**
 * パスワード変更ハンドラーのカスタムフック
 * 
 * パスワードの値を更新し、エラーをクリアする
 */
export const usePasswordHandler = (params: {
  loginForm: LoginForm,
  setLoginForm: SetForm,
  passwordError: PasswordError,
  setPasswordError: SetPasswordError
}) => {
  return useCallback((value: string) => {
    const updatedForm = new LoginForm({ 
      ...params.loginForm,
      password: new Password(value)
    });
    
    params.setLoginForm(updatedForm);
    
    if (params.passwordError) {
      params.setPasswordError(undefined);
    }
  }, [params.loginForm.email, params.setLoginForm, params.passwordError, params.setPasswordError]);
};
