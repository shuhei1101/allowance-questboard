import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';

/**
 * ログインフォームモデル
 */
export class LoginForm {
  public readonly email: Email;
  public readonly password: Password;

  constructor( params: { email: Email, password: Password }) {
    this.email = params.email;
    this.password = params.password;
  }

  /**
   * フォームが有効かどうかを判定
   * @returns メールアドレスとパスワードが両方とも有効な場合true
   */
  public isValid(): boolean {
    return this.email.isValid && this.password.isValid;
  }

  /**
   * フォームが入力済みかどうかを判定
   * @returns メールアドレスとパスワードが両方とも空でない場合true
   */
  public isFilled(): boolean {
    return this.email.value.length > 0 && this.password.value.length > 0;
  }

  /**
   * 初期状態のフォームを作成
   * @returns 初期状態のLoginFormインスタンス
   */
  public static initialize(): LoginForm {
    return new LoginForm({
      email: new Email(''),
      password: new Password(''),
    });
  }
}
