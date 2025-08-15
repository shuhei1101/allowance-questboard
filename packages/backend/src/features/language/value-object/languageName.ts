import { LocaleString } from '@backend/core/messages/localeString';
import { BaseValueObject } from '../../../core/value-object/baseValueObject';

/**
 * 言語名の値オブジェクト
 * PythonのLanguageNameクラスのTypeScript版
 */
export class LanguageName extends BaseValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator.required();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "言語名",
      en: "Language Name"
    });
  }
}
