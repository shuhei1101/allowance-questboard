import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import { LocaleString } from "@backend/core/messages/localeString";
import { z } from 'zod';

/** ExpiresAtのZodスキーマ */
export const ExpiresAtSchema = z.date();

/** 有効期限値オブジェクト */
export class ExpiresAt extends BaseValueObject<Date, typeof ExpiresAtSchema> {
  constructor(value: Date) {
    super({ value });
  }

  /** 期限切れかどうかを判定 */
  isExpired(): boolean {
    return new Date() > this.value;
  }

  /** 現在時刻から指定日数後の有効期限を作成 */
  static createFromDays(days: number): ExpiresAt {
    const expiryDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return new ExpiresAt(expiryDate);
  }

  /** 7日後の有効期限を作成（デフォルト期間） */
  static createDefault(): ExpiresAt {
    return ExpiresAt.createFromDays(7);
  }

  /** ISO文字列として取得 */
  toISOString(): string {
    return this.value.toISOString();
  }

  /** 日時文字列からExpiresAtを作成 */
  static fromString(dateString: string): ExpiresAt {
    return new ExpiresAt(new Date(dateString));
  }

  /** バリデーション */
  protected validate(): void {
    if (!this.value || isNaN(this.value.getTime())) {
      throw new Error("有効期限は有効な日時である必要があります");
    }
  }

  /** 値オブジェクトの名前を取得 */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "有効期限",
      en: "Expires At"
    });
  }

  /** Zodスキーマから新しいExpiresAtインスタンスを作成 */
  static fromZodData(data: z.infer<typeof ExpiresAtSchema>): ExpiresAt {
    return new ExpiresAt(data);
  }
}
