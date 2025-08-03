import { LocaleString } from "@shared/core/messages/localeString";
import { BaseValueObject } from "@shared/core/value-object/baseValueObject";

/**
 * ユーザーIDを表す値オブジェクト(UUID)
 */
export class UserId extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator.required();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "ユーザーID",
      en: "User ID"
    });
  }
  
}
