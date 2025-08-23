import { useNameHandler } from './useNameHandler';
import { useEmailHandler } from './useEmailHandler';
import { usePasswordHandler } from './usePasswordHandler';
import { useIconSelectHandler } from './useIconSelectHandler';
import { useBirthdayHandler } from './useBirthdayHandler';
import { useConfirmHandler } from './useConfirmHandler';
import { useParentEditPageStore as useParentEditPageStore } from '../stores/parentEditPageStore';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { useSessionStore } from '@/features/auth/stores/sessionStore';

/**
 * 親情報登録画面の全ハンドラーを統合したカスタムフック
 * 
 * 親情報登録画面で使用する全てのイベントハンドラーを一括で提供
 * 
 * @param onConfirm 確定ボタン押下時のコールバック関数
 * @param shouldUpdate 更新クエリを送信するかのフラグ (デフォルト: true)
 */
export const useParentEditPageHandlers = (params: {
  shouldUpdate: boolean,
  parentId?: ParentId,
}) => {
  const pageStore = useParentEditPageStore();
  const sessionStore = useSessionStore();
  // 名前変更時のハンドラ
  const handleNameChange = useNameHandler({
    parentForm: pageStore.parentForm,
    setParentForm: pageStore.setParentForm,
    nameError: pageStore.nameError,
    setNameError: pageStore.setNameError,
  });
  // メール変更時のハンドラ
  const handleEmailChange = useEmailHandler({
    parentForm: pageStore.parentForm,
    setParentForm: pageStore.setParentForm,
    emailError: pageStore.emailError,
    setEmailError: pageStore.setEmailError,
  });
  // パスワード変更時のハンドラ
  const handlePasswordChange = usePasswordHandler({
    parentForm: pageStore.parentForm,
    setParentForm: pageStore.setParentForm,
    passwordError: pageStore.passwordError,
    setPasswordError: pageStore.setPasswordError,
  });
  // アイコン選択時のハンドラ
  const handleIconSelect = useIconSelectHandler();
  // 誕生日変更ハンドラ
  const handleBirthdayChange = useBirthdayHandler({
    parentForm: pageStore.parentForm,
    setParentForm: pageStore.setParentForm,
    birthdayError: pageStore.birthdayError,
    setBirthdayError: pageStore.setBirthdayError,
  });
  // 確定ボタン押下時のハンドラ
  const handleConfirm = useConfirmHandler({
    parentForm: pageStore.parentForm,
    currentLanguageType: sessionStore.languageType,
    setLoading: pageStore.setLoading,
    clearErrors: pageStore.clearErrors,
    setNameError: pageStore.setNameError,
    setEmailError: pageStore.setEmailError,
    setPasswordError: pageStore.setPasswordError,
    setBirthdayError: pageStore.setBirthdayError,
    shouldUpdate: params.shouldUpdate,
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
