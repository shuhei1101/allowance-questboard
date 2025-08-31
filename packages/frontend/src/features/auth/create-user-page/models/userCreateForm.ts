import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { BaseModel } from '@backend/core/models/baseModel';

/** 新規登録フォームモデル */
export class UserCreateForm extends BaseModel {
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

  /** 初期状態のフォームを作成 */
  public static initialize(): UserCreateForm {
    return new UserCreateForm({
      email: new Email(''),
      password: new Password(''),
    });
  }
}
