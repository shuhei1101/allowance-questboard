import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";

/**
 * アイコンを表す値オブジェクト
 */
export class Icon extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // アイコンは必須ではないため、空文字は許可
    if (this.value.length > 0) {
      this.validator
        .maxLength(100);
    }
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "アイコン",
      en: "Icon"
    });
  }
}
