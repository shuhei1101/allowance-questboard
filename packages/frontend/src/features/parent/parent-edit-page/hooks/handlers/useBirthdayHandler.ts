import { useCallback } from 'react';
import { ParentForm } from '../../models/parentForm';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { FormError, SetForm, SetFormError } from '../../../../../core/stores/baseFormStore';

/**
 * 誕生日変更ハンドラーのカスタムフック
 * 
 * 誕生日の値を更新し、エラーをクリア
 */
export const useBirthdayHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetForm<ParentForm>,
  birthdayError: FormError,
  setBirthdayError: SetFormError
}) => {
  return useCallback((birthday: string) => {
    try {
      const updatedForm = new ParentForm({
        name: params.parentForm.name,
        email: params.parentForm.email,
        password: params.parentForm.password,
        icon: params.parentForm.icon,
        birthday: Birthday.fromString(birthday),
      });
      params.setParentForm(updatedForm);
      
      if (params.birthdayError) {
        params.setBirthdayError(undefined);
      }
    } catch (error: any) {
      params.setBirthdayError(error.message);
    }
  }, [
    params.parentForm,
    params.setParentForm, 
    params.birthdayError, 
    params.setBirthdayError
  ]);
};
