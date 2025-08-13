import { LocaleString } from "../../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * 家族名を表す値オブジェクト
 */
export class FamilyName extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(1)
      .maxLength(20);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族名",
      en: "Family Name"
    });
  }
}
