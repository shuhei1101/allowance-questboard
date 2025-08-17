import { useNameHandler } from './useNameHandler';
import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useIconSelectHandler } from './useIconSelectHandler';
import { useBirthdayHandler } from './useBirthdayHandler';
import { useConfirmHandler } from './useConfirmHandler';
import { useParentEditPageStore as useParentEditPageStore } from '../stores/parentEditPageStore';

/**
 * 親情報登録画面の全ハンドラーを統合したカスタムフック
 * 
 * 親情報登録画面で使用する全てのイベントハンドラーを一括で提供
 * 
 * @param onConfirm 確定ボタン押下時のコールバック関数
 */
export const useParentEditPageHandlers = (onConfirm: (parentData: any) => void) => {
  const pageStore = useParentEditPageStore();
  const handleNameChange = useNameHandler({
    parentForm: pageStore.parentForm,
    updateParentForm: pageStore.updateParentForm,
    nameError: pageStore.nameError,
    setNameError: pageStore.setNameError,
  });
  const handleEmailChange = useEmailHandler({
    parentForm: pageStore.parentForm,
    updateParentForm: pageStore.updateParentForm,
    emailError: pageStore.emailError,
    setEmailError: pageStore.setEmailError,
  });
  const handlePasswordChange = usePasswordHandler({
    parentForm: pageStore.parentForm,
    updateParentForm: pageStore.updateParentForm,
    passwordError: pageStore.passwordError,
    setPasswordError: pageStore.setPasswordError,
  });
  const handleIconSelect = useIconSelectHandler();
  const handleBirthdayChange = useBirthdayHandler({
    parentForm: pageStore.parentForm,
    updateParentForm: pageStore.updateParentForm,
    birthdayError: pageStore.birthdayError,
    setBirthdayError: pageStore.setBirthdayError,
  });
  const handleConfirm = useConfirmHandler({
    parentForm: pageStore.parentForm,
    setLoading: pageStore.setLoading,
    clearErrors: pageStore.clearErrors,
    setNameError: pageStore.setNameError,
    setEmailError: pageStore.setEmailError,
    setPasswordError: pageStore.setPasswordError,
    setBirthdayError: pageStore.setBirthdayError,
    onConfirm: onConfirm,
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
