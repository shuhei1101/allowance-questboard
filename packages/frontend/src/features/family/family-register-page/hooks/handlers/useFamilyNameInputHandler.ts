import { useCallback } from 'react';
import { FamilyRegisterForm } from '../../models/familyRegisterForm';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';
import { FamilyName } from '@backend/features/family/value-object/familyName';

export type SetFamilyRegisterForm = (form: FamilyRegisterForm) => void;

/** 家族名入力ハンドラーのパラメータ */
interface UseFamilyNameInputHandlerParams {
  /** 現在のフォーム状態 */
  currentForm: FamilyRegisterForm;
  /** フォーム更新関数 */
  setForm: SetFamilyRegisterForm;
}

/** 家族名入力ハンドラーの戻り値 */
interface UseFamilyNameInputHandlerResult {
  /** 家族名変更ハンドラー */
  handleFamilyNameChange: (value: BaseFamilyName) => void;
}

/** 家族名入力ハンドラー
 *
 * 家族名の入力変更を処理するカスタムフック */
export const useFamilyNameInputHandler = (params: UseFamilyNameInputHandlerParams): UseFamilyNameInputHandlerResult => {
  const { currentForm, setForm } = params;

  /** 家族名変更ハンドラー */
  const handleFamilyNameChange = useCallback((value: BaseFamilyName) => {
    // BaseFamilyNameをFamilyNameに変換
    const familyName = new FamilyName(value.value);
    const updatedForm = currentForm.updateFamily({
      name: familyName,
    });
    setForm(updatedForm);
  }, [currentForm, setForm]);

  return {
    handleFamilyNameChange,
  };
};
