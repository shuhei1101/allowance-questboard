import { useCallback } from 'react';
import { SetParentForm, SetBirthdayError, BirthdayError } from '../stores/parentEditPageStore';
import { ParentForm } from '../models/parentForm';
import { Birthday } from '@backend/features/shared/value-object/birthday';

/**
 * 誕生日変更ハンドラーのカスタムフック
 * 
 * 誕生日の値を更新し、エラーをクリアする
 */
export const useBirthdayHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetParentForm,
  birthdayError: BirthdayError,
  setBirthdayError: SetBirthdayError
}) => {
  return useCallback((birthday: string) => {
    try {
      const updatedForm = new ParentForm({
        name: params.parentForm.name,
        email: params.parentForm.email,
        password: params.parentForm.password,
        icon: params.parentForm.icon,
        birthday: new Birthday(birthday),
      });
      params.setParentForm(updatedForm);
      
      if (params.birthdayError) {
        params.setBirthdayError(null);
      }
    } catch (error: any) {
      params.setBirthdayError(error.message);
    }
  }, [
    params.parentForm.name, 
    params.parentForm.email, 
    params.parentForm.password, 
    params.parentForm.icon,
    params.setParentForm, 
    params.birthdayError, 
    params.setBirthdayError
  ]);
};
