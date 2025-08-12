import { Email } from '@shared/features/auth/value-object/email';
import { Password } from '@shared/features/auth/value-object/password';

/**
 * ログインフォームデータ（生の値）
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * ログインフォーム構造体クラス
 */
export class LoginForm {
  public readonly email: Email;
  public readonly password: Password;

  constructor(data: LoginFormData) {
    this.email = new Email(data.email);
    this.password = new Password(data.password);
  }

  /**
   * フォームが有効かどうかを判定
   * @returns メールアドレスとパスワードが両方とも有効な場合true
   */
  public isValid(): boolean {
    return this.email.isValid && this.password.isValid;
  }

  /**
   * 生データから安全にLoginFormを作成
   * @param data 生のフォームデータ
   * @returns 常にLoginFormを返す（無効な場合もisValidでチェック可能）
   */
  public static createSafely(data: LoginFormData): LoginForm {
    return new LoginForm(data);
  }

  /**
   * 初期の空フォームデータを作成
   */
  public static createInitialData(): LoginFormData {
    return {
      email: '',
      password: ''
    };
  }
}
