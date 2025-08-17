import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * 親の名前を表す値オブジェクト
 */
export class ParentName extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(1)
      .maxLength(50);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "親の名前",
      en: "Parent Name"
    });
  }
}
