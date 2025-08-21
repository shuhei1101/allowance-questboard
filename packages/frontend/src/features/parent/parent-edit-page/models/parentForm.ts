import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Birthday } from '@backend/features/parent/value-object/birthday';
import { Icon } from '@backend/features/parent/value-object/icon';
import { BaseModel } from '@backend/core/models/baseModel';
import { RelationValidateException } from '@backend/core/validator/validationException';
import { LocaleString } from '@backend/core/messages/localeString';

/**
 * 親登録フォームモデル
 */
export class ParentForm extends BaseModel {
  public readonly name: ParentName;
  public readonly email: Email;
  public readonly password: Password;
  public readonly icon: Icon;
  public readonly birthday: Birthday;

  constructor(params: { 
    name: ParentName;
    email: Email;
    password: Password;
    icon: Icon;
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

  /**
   * モデルの値を検証する
   */
  protected validate(): void {
    // 関連チェック無し
  }

  /**
   * 初期状態のフォームを作成
   * @returns 初期状態のParentFormインスタンス
   */
  public static initialize(): ParentForm {
    return new ParentForm({
      name: new ParentName(''),
      email: new Email(''),
      password: new Password(''),
      icon: new Icon(''),
      birthday: new Birthday(''),
    });
  }
}
