import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * PasswordのZodスキーマ
 */
export const PasswordSchema = z.string();

/**
 * パスワードを表す値オブジェクト
 */
export class Password extends BaseValueObject<string, typeof PasswordSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(8)
      .maxLength(128)
      .containsAlphaNumeric();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "パスワード",
      en: "Password"
    });
  }

  /**
   * Zodスキーマから新しいPasswordインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof PasswordSchema>): Password {
    return new Password(data);
  }
}
