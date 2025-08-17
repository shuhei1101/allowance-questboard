import { BaseId, BaseIdSchema } from '../../../core/value-object/base_id';
import { LocaleString } from '../../../core/messages/localeString';
import { z } from 'zod';

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

  /**
   * Zodスキーマから新しいFamilyMemberTypeIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): FamilyMemberTypeId {
    return new FamilyMemberTypeId(data.value);
  }
}
