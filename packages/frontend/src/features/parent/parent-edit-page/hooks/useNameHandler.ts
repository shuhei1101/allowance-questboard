import { useCallback } from 'react';
import { UpdateParentForm, SetNameError, NameError } from '../stores/parentEditPageStore';
import { ParentForm } from '../models/parentForm';
import { ParentName } from '@backend/features/parent/value-object/parentName';

/**
 * 名前変更ハンドラーのカスタムフック
 * 
 * 名前の値を更新し、エラーをクリアする
 */
export const useNameHandler = (params: {
  parentForm: ParentForm,
  updateParentForm: UpdateParentForm,
  nameError: NameError,
  setNameError: SetNameError
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
      params.updateParentForm(updatedForm);
      
      if (params.nameError) {
        params.setNameError(null);
      }
    } catch (error: any) {
      params.setNameError(error.message);
    }
  }, [
    params.parentForm.email, 
    params.parentForm.password, 
    params.parentForm.icon, 
    params.parentForm.birthday,
    params.updateParentForm, 
    params.nameError, 
    params.setNameError
  ]);
};
