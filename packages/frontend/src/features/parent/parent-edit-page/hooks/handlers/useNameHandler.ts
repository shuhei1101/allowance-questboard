import { useCallback } from 'react';
import { ParentForm } from '../../models/parentForm';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { FormError, SetForm, SetFormError } from '../../../../../core/stores/baseFormStore';

/**
 * 名前変更ハンドラーのカスタムフック
 * 
 * 名前の値を更新し、エラーをクリアする
 */
export const useNameHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetForm<ParentForm>,
  nameError: FormError,
  setNameError: SetFormError
}) => {
  return useCallback((name: string) => {
    try {
      const updatedForm = new ParentForm({
        name: new ParentName(name),
        email: params.parentForm.email,
        password: params.parentForm.password,
        icon: params.parentForm.icon,
        birthday: params.parentForm.birthday,
      });
      params.setParentForm(updatedForm);
      
      if (params.nameError) {
        params.setNameError(undefined);
      }
    } catch (error: any) {
      params.setNameError(error.message);
    }
  }, [
    params.parentForm.email, 
    params.parentForm.password, 
    params.parentForm.icon, 
    params.parentForm.birthday,
    params.setParentForm, 
    params.nameError, 
    params.setNameError
  ]);
};
