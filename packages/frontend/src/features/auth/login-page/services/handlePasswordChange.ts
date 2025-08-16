import { LoginForm } from '../models/loginForm';
import { Password } from '@backend/features/auth/value-object/password';
import { useLoginPageStore } from '../stores/loginPageStore';

/**
 * パスワード変更ハンドラーのパラメータ
 */
export interface HandlePasswordChangeParams {
  /** 新しいパスワード */
  value: string;
}

/**
 * パスワード変更ハンドラー
 * 
 * パスワードの値を更新し、エラーをクリアする
 * 
 * @param params パスワード変更パラメータ
 */
export const handlePasswordChange = (params: HandlePasswordChangeParams): void => {
  const { value } = params;
  const pageStore = useLoginPageStore();
  
  const updatedForm = new LoginForm({ 
    email: pageStore.loginForm.email,
    password: new Password(value)
  });
  
  pageStore.updateLoginForm(updatedForm);
  
  // エラーをクリア
  if (pageStore.passwordError) {
    pageStore.setPasswordError(null);
  }
};
