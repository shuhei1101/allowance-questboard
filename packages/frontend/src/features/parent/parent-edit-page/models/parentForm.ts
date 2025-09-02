import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { BaseForm } from '@backend/core/models/baseForm';
import { Icon } from '@backend/features/icon/domain/icon';

/** 親登録フォームモデル */
export class ParentForm extends BaseForm {
  public readonly name: ParentName;
  public readonly email: Email;
  public readonly password: Password;
  public readonly icon?: Icon;
  public readonly birthday: Birthday;

  constructor(params: { 
    name: ParentName;
    email: Email;
    password: Password;
    icon?: Icon;
    birthday: Birthday;
  }) {
    super();
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.icon = params.icon;
    this.birthday = params.birthday;
    this.runValidate();
  }

  /** モデルの値を検証する */
  protected validate(): void {
    this.validator.valuesEmpty(
      this.name, this.email, this.password,
      this.birthday,
    )
  }

  /** 初期状態のフォームを作成 */
  public static initialize(): ParentForm {
    return new ParentForm({
      name: new ParentName(''),
      email: new Email(''),
      password: new Password(''),
      icon: undefined,
      birthday: new Birthday(),
    });
  }
}
