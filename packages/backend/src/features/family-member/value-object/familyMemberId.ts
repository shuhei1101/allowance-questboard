import { BaseId, BaseIdSchema } from '../../../core/value-object/base_id';
import { LocaleString } from '../../../core/messages/localeString';
import { z } from 'zod';

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

  /**
   * Zodスキーマから新しいFamilyMemberIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): FamilyMemberId {
    return new FamilyMemberId(data.value);
  }
}
