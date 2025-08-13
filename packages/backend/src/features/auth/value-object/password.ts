import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * パスワードを表す値オブジェクト
 */
export class Password extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(8)
      .maxLength(128)
      .containsAlphaNumeric();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "パスワード",
      en: "Password"
    });
  }
}
