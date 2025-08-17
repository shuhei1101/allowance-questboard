import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * IconのZodスキーマ
 */
export const IconSchema = z.object({
  value: z.string()
});

/**
 * アイコンを表す値オブジェクト
 */
export class Icon extends BaseValueObject<string, typeof IconSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // アイコンは必須ではないため、空文字は許可
    if (this.value.length > 0) {
      this.validator
        .maxLength(100);
    }
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "アイコン",
      en: "Icon"
    });
  }

  /**
   * Zodスキーマから新しいIconインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconSchema>): Icon {
    return new Icon(data.value);
  }
}
