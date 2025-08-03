import { LocaleString } from "@shared/core/messages/localeString";
import { ValueValidateException } from "@shared/core/validator/validationException";
import { BaseValueObject } from "@shared/core/value-object/baseValueObject";

export class Version extends BaseValueObject<number> {
  constructor(value: number) {
    super({ value });
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "バージョン", en: "Version"
    });
  }

  protected validate(): void {
    if (this.value < 0) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "InvalidVersion",
        message: new LocaleString({ ja: "バージョンは0以上の数値でなければなりません", en: "Version must be a non-negative number", })
      });
    }
  }
}
