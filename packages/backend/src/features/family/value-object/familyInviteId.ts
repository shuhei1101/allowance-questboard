import { BaseId, BaseIdSchema } from "@backend/core/value-object/base_id";
import { LocaleString } from "@backend/core/messages/localeString";
import { z } from 'zod';

/**
 * 家族招待のIDを表す値オブジェクト
 */
export class FamilyInviteId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族招待ID",
      en: "Family Invite ID"
    });
  }

  /**
   * Zodスキーマから新しいFamilyInviteIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): FamilyInviteId {
    return new FamilyInviteId(data);
  }
}
