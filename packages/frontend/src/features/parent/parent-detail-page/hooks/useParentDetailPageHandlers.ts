import { useParentDetailPageStore } from '../stores/parentDetailPageStore';
import { ParentForm } from '../models/parentForm';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Icon } from '@backend/features/parent/value-object/icon';
import { Birthday } from '@backend/features/parent/value-object/birthday';

/**
 * 親情報登録画面の全ハンドラーを統合したカスタムフック
 * 
 * @param onConfirm 確定ボタン押下時のコールバック関数
 */
export const useParentDetailPageHandlers = (onConfirm: (parentData: any) => void) => {
  const pageStore = useParentDetailPageStore();

  /**
   * 名前変更ハンドラー
   */
  const handleNameChange = (name: string) => {
    try {
      const updatedForm = new ParentForm({
        name: new ParentName(name),
        email: pageStore.parentForm.email,
        password: pageStore.parentForm.password,
        icon: pageStore.parentForm.icon,
        birthday: pageStore.parentForm.birthday,
      });
      pageStore.updateParentForm(updatedForm);
      pageStore.setNameError(null);
    } catch (error: any) {
      pageStore.setNameError(error.message);
    }
  };

  /**
   * メールアドレス変更ハンドラー
   */
  const handleEmailChange = (email: string) => {
    try {
      const updatedForm = new ParentForm({
        name: pageStore.parentForm.name,
        email: new Email(email),
        password: pageStore.parentForm.password,
        icon: pageStore.parentForm.icon,
        birthday: pageStore.parentForm.birthday,
      });
      pageStore.updateParentForm(updatedForm);
      pageStore.setEmailError(null);
    } catch (error: any) {
      pageStore.setEmailError(error.message);
    }
  };

  /**
   * パスワード変更ハンドラー
   */
  const handlePasswordChange = (password: string) => {
    try {
      const updatedForm = new ParentForm({
        name: pageStore.parentForm.name,
        email: pageStore.parentForm.email,
        password: new Password(password),
        icon: pageStore.parentForm.icon,
        birthday: pageStore.parentForm.birthday,
      });
      pageStore.updateParentForm(updatedForm);
      pageStore.setPasswordError(null);
    } catch (error: any) {
      pageStore.setPasswordError(error.message);
    }
  };

  /**
   * アイコン選択ハンドラー
   */
  const handleIconSelect = () => {
    // 一旦はメッセージ表示のみ
    alert('アイコン選択画面へ遷移');
  };

  /**
   * 誕生日変更ハンドラー
   */
  const handleBirthdayChange = (birthday: string) => {
    try {
      const updatedForm = new ParentForm({
        name: pageStore.parentForm.name,
        email: pageStore.parentForm.email,
        password: pageStore.parentForm.password,
        icon: pageStore.parentForm.icon,
        birthday: new Birthday(birthday),
      });
      pageStore.updateParentForm(updatedForm);
      pageStore.setBirthdayError(null);
    } catch (error: any) {
      pageStore.setBirthdayError(error.message);
    }
  };

  /**
   * 確定ボタン押下ハンドラー
   */
  const handleConfirm = async () => {
    try {
      // バリデーション実行
      if (!pageStore.parentForm.isValid) {
        throw new Error('必須項目が入力されていません');
      }

      pageStore.setLoading(true);
      pageStore.clearErrors();

      // 親情報の登録API呼び出し（今後実装予定）
      // await registerParent(pageStore.parentForm);

      // コールバック実行
      onConfirm(pageStore.parentForm);
      
    } catch (error: any) {
      // エラー時の処理
      console.error('親情報登録エラー:', error);
      
      // 各フィールドのエラーメッセージ設定（今後詳細化予定）
      if (error.message.includes('名前')) {
        pageStore.setNameError(error.message);
      }
      if (error.message.includes('メール')) {
        pageStore.setEmailError(error.message);
      }
      if (error.message.includes('パスワード')) {
        pageStore.setPasswordError(error.message);
      }
      if (error.message.includes('誕生日')) {
        pageStore.setBirthdayError(error.message);
      }
    } finally {
      pageStore.setLoading(false);
    }
  };

  return {
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleIconSelect,
    handleBirthdayChange,
    handleConfirm,
  };
};
