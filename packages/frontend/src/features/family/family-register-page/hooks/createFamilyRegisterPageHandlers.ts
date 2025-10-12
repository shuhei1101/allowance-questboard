import { useFamilyNameInputHandler } from './handlers/useFamilyNameInputHandler';
import { useOnlineFamilyNameInputHandler } from './handlers/useOnlineFamilyNameInputHandler';
import { useFamilyIdInputHandler } from './handlers/useFamilyIdInputHandler';
import { useFamilyIconSelectHandler } from './handlers/useFamilyIconSelectHandler';
import { useParentEditHandler } from './handlers/useParentEditHandler';
import { useFamilyRegisterSubmitHandler } from './handlers/useFamilyRegisterSubmitHandler';
import { FamilyRegisterFormStore, useFamilyRegisterFormStore } from '../stores/familyRegisterFormStore';
import { registerFamily } from '../services/registerFamily';
import { checkFamilyIdDuplicate } from '../../services/checkFamilyIdDuplicate';
import { SessionStore, useSessionStore } from '../../../../core/constants/sessionStore';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { FamilyId } from '@backend/features/family/value-object/familyId';

/** 家族登録ページの全ハンドラーを統合したカスタムフック
 * 
 * 家族登録ページで使用する全てのイベントハンドラーを一括で提供 */
export const createFamilyRegisterPageHandlers = (params: {
  onSubmitComplete?: (params: {familyId: FamilyId, parentId: ParentId}) => void,
  setLoading: (loading: boolean) => void,
  formStore: FamilyRegisterFormStore,
  sessionStore: SessionStore,
}) => {
  // 家族名入力ハンドラー
  const familyNameInputHandler = useFamilyNameInputHandler({
    currentForm: params.formStore.form,
    setForm: params.formStore.setForm,
  });

  // オンライン家族名入力ハンドラー
  const onlineFamilyNameInputHandler = useOnlineFamilyNameInputHandler({
    currentForm: params.formStore.form,
    setForm: params.formStore.setForm,
  });

  // 家族ID入力ハンドラー
  const familyIdInputHandler = useFamilyIdInputHandler({
    currentForm: params.formStore.form,
    setForm: params.formStore.setForm,
    currentLanguageType: params.sessionStore.languageType,
    checkFamilyIdDuplicate: checkFamilyIdDuplicate,
  });

  // 家紋選択ハンドラー
  const familyIconSelectHandler = useFamilyIconSelectHandler({
    currentForm: params.formStore.form,
    setForm: params.formStore.setForm,
  });

  // 親情報編集ハンドラー
  const parentEditHandler = useParentEditHandler({
    currentForm: params.formStore.form,
    setForm: params.formStore.setForm,
  });

  // 家族登録確定ボタンハンドラー
  const submitHandler = useFamilyRegisterSubmitHandler({
    currentForm: params.formStore.form,
    registerFamily: registerFamily,
    onSubmitComplete: params.onSubmitComplete,
    setLoading: params.setLoading,
  });

  return {
    // 家族名入力関連
    handleFamilyNameChange: familyNameInputHandler.handleFamilyNameChange,
    
    // オンライン家族名入力関連
    handleOnlineFamilyNameChange: onlineFamilyNameInputHandler.handleOnlineFamilyNameChange,
    
    // 家族ID入力関連
    handleFamilyIdChange: familyIdInputHandler.handleFamilyIdChange,
    isCheckingDuplicate: familyIdInputHandler.isCheckingDuplicate,
    duplicateError: familyIdInputHandler.duplicateError,
    
    // 家紋選択関連
    handleFamilyIconSelect: familyIconSelectHandler.handleFamilyIconSelect,
    
    // 親情報編集関連
    handleParentEdit: parentEditHandler.handleParentEdit,
    
    // 確定ボタン関連
    handleSubmit: submitHandler.handleSubmit,
  };
};
