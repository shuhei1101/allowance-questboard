import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { BaseForm } from '@backend/core/models/baseForm';

/** 新規登録フォームモデル */
export class UserCreateForm extends BaseForm {
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

  public static initialize(): UserCreateForm {
    return new UserCreateForm({
      email: new Email(''),
      password: new Password(''),
    });
  }
}
