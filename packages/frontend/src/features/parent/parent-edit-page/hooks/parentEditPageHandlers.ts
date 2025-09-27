import { useNameHandler } from './handlers/useNameHandler';
import { useEmailHandler } from './handlers/useEmailHandler';
import { usePasswordHandler } from './handlers/usePasswordHandler';
import { useBirthdayHandler } from './handlers/useBirthdayHandler';
import { useConfirmHandler } from './handlers/useConfirmHandler';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { useIconSelectHandler } from './handlers/useIconSelectHandler';
import { HandleParentForm } from '../ParentEditPage';
import { SessionStore } from '../../../../core/constants/sessionStore';
import { ParentFormStore } from '../stores/parentFormStore';

/** 親情報登録画面の全ハンドラーを統合したカスタムフック
 * 親情報登録画面で使用する全てのイベントハンドラーを一括で提供 */
export const parentEditPageHandlers = (params: {
  shouldUpdate: boolean,
  parentId?: ParentId,
  handleParentForm?: HandleParentForm,
  sessionStore: SessionStore,
  formStore: ParentFormStore,
  setLoading: (loading: boolean) => void,
}) => {
  // 名前変更時のハンドラ
  const handleNameChange = useNameHandler({
    parentForm: params.formStore.form,
    setParentForm: params.formStore.setForm,
    nameError: params.formStore.errors.name,
    setNameError: params.formStore.setNameError,
  });
  // メール変更時のハンドラ
  const handleEmailChange = useEmailHandler({
    parentForm: params.formStore.form,
    setParentForm: params.formStore.setForm,
    emailError: params.formStore.errors.email,
    setEmailError: params.formStore.setEmailError,
  });
  // パスワード変更時のハンドラ
  const handlePasswordChange = usePasswordHandler({
    parentForm: params.formStore.form,
    setParentForm: params.formStore.setForm,
    passwordError: params.formStore.errors.password,
    setPasswordError: params.formStore.setPasswordError,
  });
  // アイコン選択時のハンドラ
  const handleIconSelect = useIconSelectHandler({
    parentForm: params.formStore.form,
    setParentForm: params.formStore.setForm,
  });
  // 誕生日変更ハンドラ
  const handleBirthdayChange = useBirthdayHandler({
    parentForm: params.formStore.form,
    setParentForm: params.formStore.setForm,
    birthdayError: params.formStore.errors.birthday,
    setBirthdayError: params.formStore.setBirthdayError,
  });
  // 確定ボタン押下時のハンドラ
  const handleConfirm = useConfirmHandler({
    parentForm: params.formStore.form,
    currentLanguageType: params.sessionStore.languageType,
    setLoading: params.setLoading,
    clearErrors: params.formStore.clearErrors,
    setNameError: params.formStore.setNameError,
    setEmailError: params.formStore.setEmailError,
    setPasswordError: params.formStore.setPasswordError,
    setBirthdayError: params.formStore.setBirthdayError,
    shouldUpdate: params.shouldUpdate,
    handleParentForm: params.handleParentForm,
  });

  return {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleIconSelect,
    handleBirthdayChange,
    handleConfirm,
  };
};
