import { LoginForm } from '../models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { useLoginPageStore } from '../stores/loginPageStore';

/**
 * メール変更ハンドラー
 * 
 * メールアドレスの値を更新し、エラーをクリアする
 * 
 * @param value 新しいメールアドレス
 */
export const handleEmailChange = (value: string): void => {
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
