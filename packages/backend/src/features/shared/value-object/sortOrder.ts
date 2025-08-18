import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import { LocaleString } from "../../../core/messages/localeString";
import { ValueValidateException } from "../../../core/validator/validationException";
import { z } from 'zod';

/**
 * SortOrderのZodスキーマ
 */
export const SortOrderSchema = z.object({
  value: z.number()
});

export class SortOrder extends BaseValueObject<number, typeof SortOrderSchema> {
  constructor(value: number) {
    super({ value });
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "表示順序", en: "Sort Order"
    });
  }

  protected validate(): void {
    if (this.value < 0) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "InvalidSortOrder",
        message: new LocaleString({ 
          ja: "表示順序は0以上の数値でなければなりません", 
          en: "Sort order must be a non-negative number" 
        })
      });
    }
  }

  /**
   * Zodスキーマから新しいSortOrderインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof SortOrderSchema>): SortOrder {
    return new SortOrder(data.value);
  }
}
