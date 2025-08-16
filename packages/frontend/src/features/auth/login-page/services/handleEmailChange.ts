import { LoginForm } from '../models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { useLoginPageStore } from '../stores/loginPageStore';

/**
 * メール変更ハンドラーのパラメータ
 */
export interface HandleEmailChangeParams {
  /** 新しいメールアドレス */
  value: string;
}

/**
 * メール変更ハンドラー
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 * 
 * @param params メール変更パラメータ
 */
export const handleEmailChange = (params: HandleEmailChangeParams): void => {
  const { value } = params;
  const pageStore = useLoginPageStore();
  
  const updatedForm = new LoginForm({ 
    email: new Email(value), 
    password: pageStore.loginForm.password 
  });
  
  pageStore.updateLoginForm(updatedForm);
  
  // エラーをクリア
  if (pageStore.emailError) {
    pageStore.setEmailError(null);
  }
};
