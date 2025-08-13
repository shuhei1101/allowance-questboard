import { BaseId } from '../../../core/value-object/base_id';
import { LocaleString } from '../../../core/messages/localeString';

/**
 * 家族メンバータイプのIDを表す値オブジェクト
 * PythonのFamilyMemberTypeIdクラスのTypeScript版
 */
export class FamilyMemberTypeId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族メンバータイプID",
      en: "Family Member Type ID"
    });
  }
}
