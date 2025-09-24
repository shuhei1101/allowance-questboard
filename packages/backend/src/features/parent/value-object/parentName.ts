import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * ParentNameのZodスキーマ
 */
export const ParentNameSchema = z.string();

/**
 * 親の名前を表す値オブジェクト
 */
export class ParentName extends BaseValueObject<string, typeof ParentNameSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(1)
      .maxLength(50);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "親の名前",
      en: "Parent Name"
    });
  }

  /**
   * Zodスキーマから新しいParentNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof ParentNameSchema>): ParentName {
    return new ParentName(data);
  }
}
