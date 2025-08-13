import { BaseId } from '../../../core/value-object/base_id';
import { LocaleString } from '../../../core/messages/localeString';

/**
 * 家族メンバーのIDを表す値オブジェクト
 * PythonのFamilyMemberIdクラスのTypeScript版
 */
export class FamilyMemberId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族メンバーID",
      en: "Family Member ID"
    });
  }
}
