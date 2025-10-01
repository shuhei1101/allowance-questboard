import { LocaleString } from "@backend/core/messages/localeString";
import { BaseFamilyName, BaseFamilyNameSchema } from "./baseFamilyName";
import { z } from 'zod';

/**
 * FamilyOnlineNameのZodスキーマ
 */
export const FamilyOnlineNameSchema = BaseFamilyNameSchema;

/**
 * オンライン家族名を表す値オブジェクト
 */
export class FamilyOnlineName extends BaseFamilyName {
  constructor(value: string) {
    super(value);
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(3)
      .maxLength(20);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "オンライン家族名",
      en: "Family Online Name"
    });
  }

  /**
   * Zodスキーマから新しいFamilyOnlineNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof FamilyOnlineNameSchema>): FamilyOnlineName {
    return new FamilyOnlineName(data);
  }
}
