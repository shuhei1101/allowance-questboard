import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * BirthdayのZodスキーマ
 */
export const BirthdaySchema = z.object({
  value: z.string()
});

/**
 * 誕生日を表す値オブジェクト
 */
export class Birthday extends BaseValueObject<string, typeof BirthdaySchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // 一旦シンプルな実装
    this.validator
      .required()
      .minLength(1)
      .maxLength(20);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "誕生日",
      en: "Birthday"
    });
  }

  /**
   * Zodスキーマから新しいBirthdayインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BirthdaySchema>): Birthday {
    return new Birthday(data.value);
  }
}
