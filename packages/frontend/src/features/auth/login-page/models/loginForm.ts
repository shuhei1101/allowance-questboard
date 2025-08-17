import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { BaseModel } from '@backend/core/models/baseModel';
import { RelationValidateException } from '@backend/core/validator/validationException';
import { LocaleString } from '@backend/core/messages/localeString';

/**
 * ログインフォームモデル
 */
export class LoginForm extends BaseModel {
  public readonly email: Email;
  public readonly password: Password;

  constructor( params: { email: Email, password: Password }) {
    super();
    this.email = params.email;
    this.password = params.password;
    this.runValidate();
  }

  /**
   * モデルの値を検証する
   */
  protected validate(): void {
    if (this.email.value.length === 0 || this.password.value.length === 0) {
      throw new RelationValidateException({
        errorType: 'LoginFormValidationError',
        message: new LocaleString({
          ja: 'メールアドレスとパスワードの両方を入力してください',
          en: 'Please enter both email and password',
        })
      })
    }
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
