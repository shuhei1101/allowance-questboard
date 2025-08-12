import { LocaleString } from '../../../core/messages/localeString';
import { BaseValueObject } from '../../../core/value-object/baseValueObject';

/**
 * 言語コードの値オブジェクト
 * PythonのLanguageCodeクラスのTypeScript版
 */
export class LanguageCode extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator.required();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "言語コード",
      en: "Language Code"
    });
  }
}
