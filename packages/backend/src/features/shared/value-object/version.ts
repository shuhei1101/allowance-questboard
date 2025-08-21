import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import { LocaleString } from "../../../core/messages/localeString";
import { ValueValidateError } from "../../../core/validator/validationError";
import { z } from 'zod';

/**
 * VersionのZodスキーマ
 */
export const VersionSchema = z.object({
  value: z.number()
});

export class Version extends BaseValueObject<number, typeof VersionSchema> {
  constructor(value: number) {
    super({ value });
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "バージョン", en: "Version"
    });
  }

  protected validate(): void {
    if (this.value < 0) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "InvalidVersion",
        message: new LocaleString({ ja: "バージョンは0以上の数値でなければなりません", en: "Version must be a non-negative number", })
      });
    }
  }

  /**
   * Zodスキーマから新しいVersionインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof VersionSchema>): Version {
    return new Version(data.value);
  }
}
