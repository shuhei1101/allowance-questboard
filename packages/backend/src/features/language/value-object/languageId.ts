import { LocaleString } from "src/core/messages/localeString";
import { BaseId } from "../../../core/value-object/base_id";

/**
 * 言語IDを表す値オブジェクト
 * PythonのLanguageIdクラスのTypeScript版
 */
export class LanguageId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "言語ID",
      en: "Language ID"
    });
  }
}
