import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * ユーザーIDを表す値オブジェクト(UUID)
 */
export class UserId extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // UUID形式の基本的なバリデーション
    if (!this.value || this.value.trim() === '') {
      throw new Error('User ID is required');
    }
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "ユーザーID",
      en: "User ID"
    });
  }
  
}
