import { useCallback } from 'react';
import { SetParentForm, SetEmailError, EmailError } from '../stores/parentEditPageStore';
import { ParentForm } from '../models/parentForm';
import { Email } from '@backend/features/auth/value-object/email';

/**
 * メールアドレス変更ハンドラーのカスタムフック
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 */
export const useEmailHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetParentForm,
  emailError: EmailError,
  setEmailError: SetEmailError
}) => {
  return useCallback((email: string) => {
    try {
      const updatedForm = new ParentForm({
        name: params.parentForm.name,
        email: new Email(email),
        password: params.parentForm.password,
        icon: params.parentForm.icon,
        birthday: params.parentForm.birthday,
      });
      params.setParentForm(updatedForm);
      
      if (params.emailError) {
        params.setEmailError(undefined);
      }
    } catch (error: any) {
      params.setEmailError(error.message);
    }
  }, [
    params.parentForm.name, 
    params.parentForm.password, 
    params.parentForm.icon, 
    params.parentForm.birthday,
    params.setParentForm, 
    params.emailError, 
    params.setEmailError
  ]);
};
