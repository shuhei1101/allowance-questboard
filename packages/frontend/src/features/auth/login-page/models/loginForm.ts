import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { BaseModel } from '@backend/core/models/baseModel';
import { LocaleString } from '@backend/core/messages/localeString';
import { RelationValidateError } from '@backend/core/validator/validationError';

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
    this.validator.valuesEmpty(this.email, this.password);
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
