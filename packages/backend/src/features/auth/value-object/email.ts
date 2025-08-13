import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * メールアドレスを表す値オブジェクト
 */
export class Email extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(5)
      .maxLength(254)
      .email();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "メールアドレス",
      en: "Email Address"
    });
  }
}
