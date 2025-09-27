import { useCallback } from 'react';
import { Icon } from '../../../../../../../backend/src/features/icon/domain/icon';
import { ParentForm } from '../../models/parentForm';
import { SetForm } from '../../../../../core/stores/baseFormStore';

/**
 * アイコン選択ハンドラーのカスタムフック
 * 
 * アイコン選択画面への遷移を行う
 */
export const useIconSelectHandler = (params: {
  parentForm: ParentForm,
  setParentForm: SetForm<ParentForm>,
}) => {
  return useCallback((icon: Icon) => {
    const updatedForm = new ParentForm({
      name: params.parentForm.name,
      email: params.parentForm.email,
      password: params.parentForm.password,
      icon: icon,
      birthday: params.parentForm.birthday,
    });
    params.setParentForm(updatedForm);
  }, [params]);
};
