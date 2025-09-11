import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { BaseForm } from '@backend/core/models/baseForm';

/** 新規登録フォームモデル */
export class UserRegisterForm extends BaseForm {
  public readonly email: Email;
  public readonly password: Password;

  constructor(params: { email: Email, password: Password }) {
    super();
    this.email = params.email;
    this.password = params.password;
    this.runValidate();
  }

  /** モデルの値を検証する */
  protected validate(): void {
    this.validator.valuesEmpty(this.email, this.password);
  }

  /** フォームに入力値があるかチェック */
  public hasInput(): boolean {
    return this.email.value.trim() !== '' || this.password.value.trim() !== '';
  }

  public static initialize(): UserRegisterForm {
    return new UserRegisterForm({
      email: new Email(''),
      password: new Password(''),
    });
  }
}
