import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * UserIdのZodスキーマ
 */
export const UserIdSchema = z.string();

/**
 * ユーザーIDを表す値オブジェクト(UUID)
 */
export class UserId extends BaseValueObject<string, typeof UserIdSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // UUID形式の基本的なバリデーション
    if (!this.value || this.value.trim() === '') {
      throw new Error('User ID is required');
    }
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "ユーザーID",
      en: "User ID"
    });
  }

  /**
   * Zodスキーマから新しいUserIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof UserIdSchema>): UserId {
    return new UserId(data);
  }
}
