import { useCallback } from 'react';
import { FamilyRegisterForm } from '../../models/familyRegisterForm';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';

export type SetFamilyRegisterForm = (form: FamilyRegisterForm) => void;

/** オンライン家族名入力ハンドラーのパラメータ */
interface UseOnlineFamilyNameInputHandlerParams {
  /** 現在のフォーム状態 */
  currentForm: FamilyRegisterForm;
  /** フォーム更新関数 */
  setForm: SetFamilyRegisterForm;
}

/** オンライン家族名入力ハンドラーの戻り値 */
interface UseOnlineFamilyNameInputHandlerResult {
  /** オンライン家族名変更ハンドラー */
  handleOnlineFamilyNameChange: (value: FamilyOnlineName) => void;
}

/** オンライン家族名入力ハンドラー
 *
 * オンライン家族名の入力変更を処理するカスタムフック */
export const useOnlineFamilyNameInputHandler = (params: UseOnlineFamilyNameInputHandlerParams): UseOnlineFamilyNameInputHandlerResult => {
  const { currentForm, setForm } = params;

  /** オンライン家族名変更ハンドラー */
  const handleOnlineFamilyNameChange = useCallback((value: FamilyOnlineName) => {
    const updatedForm = currentForm.updateFamily({
      onlineName: value,
    });
    setForm(updatedForm);
  }, [currentForm, setForm]);

  return {
    handleOnlineFamilyNameChange,
  };
};
