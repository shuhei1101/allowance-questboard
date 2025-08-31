import { LocaleString } from "@backend/core/messages/localeString";
import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * TableNameのZodスキーマ
 */
export const TableNameSchema = z.string();

/**
 * テーブル名を表す値オブジェクト
 */
export class TableName extends BaseValueObject<string, typeof TableNameSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "テーブル名",
      en: "Table Name"
    });
  }

  /**
   * Zodスキーマから新しいTableNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof TableNameSchema>): TableName {
    return new TableName(data);
  }
}
