import { useCallback } from 'react';
import { SetParentForm, SetPasswordError, PasswordError } from '../../stores/parentEditPageStore';
import { ParentForm } from '../../models/parentForm';
import { Password } from '@backend/features/auth/value-object/password';

/**
 * パスワード変更ハンドラーのカスタムフック
 * 
 * パスワードの値を更新し、エラーをクリアする
 */
export const usePasswordHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetParentForm,
  passwordError: PasswordError,
  setPasswordError: SetPasswordError
}) => {
  return useCallback((password: string) => {
    try {
      const updatedForm = new ParentForm({
        name: params.parentForm.name,
        email: params.parentForm.email,
        password: new Password(password),
        icon: params.parentForm.icon,
        birthday: params.parentForm.birthday,
      });
      params.setParentForm(updatedForm);
      
      if (params.passwordError) {
        params.setPasswordError(undefined);
      }
    } catch (error: any) {
      params.setPasswordError(error.message);
    }
  }, [
    params.parentForm.name, 
    params.parentForm.email, 
    params.parentForm.icon, 
    params.parentForm.birthday,
    params.setParentForm, 
    params.passwordError, 
    params.setPasswordError
  ]);
};
