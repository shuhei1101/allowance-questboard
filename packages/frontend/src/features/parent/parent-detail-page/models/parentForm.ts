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
    const errors: string[] = [];

    // 必須項目チェック
    if (this.name.value.length === 0) {
      errors.push('名前');
    }
    if (this.email.value.length === 0) {
      errors.push('メールアドレス');
    }
    if (this.password.value.length === 0) {
      errors.push('パスワード');
    }
    if (this.birthday.value.length === 0) {
      errors.push('誕生日');
    }

    if (errors.length > 0) {
      throw new RelationValidateException({
        errorType: 'ParentFormValidationError',
        message: new LocaleString({
          ja: `必須項目が入力されていません: ${errors.join(', ')}`,
          en: `Required fields are not filled: ${errors.join(', ')}`,
        })
      });
    }
  }

  /**
   * フォームの入力が有効かどうかを判定
   * @returns 有効な場合はtrue
   */
  public get isValid(): boolean {
    try {
      this.runValidate();
      return true;
    } catch {
      return false;
    }
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
