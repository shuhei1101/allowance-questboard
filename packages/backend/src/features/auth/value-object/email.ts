import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * EmailのZodスキーマ
 */
export const EmailSchema = z.object({
  value: z.string().email()
});

/**
 * メールアドレスを表す値オブジェクト
 */
export class Email extends BaseValueObject<string, typeof EmailSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(5)
      .maxLength(254)
      .email();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "メールアドレス",
      en: "Email Address"
    });
  }

  /**
   * Zodスキーマから新しいEmailインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof EmailSchema>): Email {
    return new Email(data.value);
  }
}
