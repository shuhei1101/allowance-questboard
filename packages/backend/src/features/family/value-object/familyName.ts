import { LocaleString } from "@backend/core/messages/localeString";
import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * FamilyNameのZodスキーマ
 */
export const FamilyNameSchema = z.object({
  value: z.string()
});

/**
 * 家族名を表す値オブジェクト
 */
export class FamilyName extends BaseValueObject<string, typeof FamilyNameSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(1)
      .maxLength(20);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "家族名",
      en: "Family Name"
    });
  }

  /**
   * Zodスキーマから新しいFamilyNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof FamilyNameSchema>): FamilyName {
    return new FamilyName(data.value);
  }
}
