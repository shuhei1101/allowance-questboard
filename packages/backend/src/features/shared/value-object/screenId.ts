import { BaseId } from '../../core/value-object/base_id';
import { LocaleString } from '../../../core/messages/localeString';

/**
 * スクリーンのIDを表す値オブジェクト
 * PythonのScreenIdクラスのTypeScript版
 */
export class ScreenId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "スクリーンID",
      en: "Screen ID"
    });
  }
}
