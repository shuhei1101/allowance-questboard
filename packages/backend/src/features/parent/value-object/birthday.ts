import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * 誕生日を表す値オブジェクト
 */
export class Birthday extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // 一旦シンプルな実装
    this.validator
      .required()
      .minLength(1)
      .maxLength(20);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "誕生日",
      en: "Birthday"
    });
  }
}
