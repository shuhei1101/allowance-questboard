import { useCallback } from 'react';
import { ParentForm } from '../../models/parentForm';
import { Email } from '@backend/features/auth/value-object/email';
import { FormError, SetForm, SetFormError } from '../../../../../core/stores/baseFormStore';

/**
 * メールアドレス変更ハンドラーのカスタムフック
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 */
export const useEmailHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetForm<ParentForm>,
  emailError: FormError,
  setEmailError: SetFormError
}) => {
  return useCallback((email: Email) => {
    try {
      const updatedForm = new ParentForm({
        name: params.parentForm.name,
        email: email,
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
