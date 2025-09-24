import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * BirthdayのZodスキーマ
 */
export const BirthdaySchema = z.date();

/**
 * 誕生日を表す値オブジェクト
 */
export class Birthday extends BaseValueObject<Date, typeof BirthdaySchema> {
  constructor(value?: Date) {
    // 初期値: 20年前
    const dateValue = value ? value : new Date(new Date().setFullYear(new Date().getFullYear() - 20));
    
    // Invalid Dateの場合はエラーを投げる
    if (isNaN(dateValue.getTime())) {
      throw new Error('Invalid date');
    }
    
    super({ value: dateValue });
  }

  toString(): string {
    return this.value.toDateString();
  }

  /**
   * ISO 8601形式の文字列として出力
   * フロントエンドのDateTimePickerとの互換性のため
   */
  toISOString(): string {
    return this.value.toISOString();
  }

  protected validate(): void {
    this.validator
      .required()
      .todayOrBefore();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "誕生日",
      en: "Birthday"
    });
  }

  /**
   * 文字列から新しいBirthdayインスタンスを作成
   * @param dateString ISO 8601形式の日付文字列
   */
  static fromString(dateString: string): Birthday {
    const dateValue = new Date(dateString);
    
    // Invalid Dateの場合はエラーを投げる
    if (isNaN(dateValue.getTime())) {
      throw new Error('Invalid date format');
    }
    
    return new Birthday(dateValue);
  }

  /**
   * Zodスキーマから新しいBirthdayインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BirthdaySchema>): Birthday {
    return new Birthday(data);
  }
}
