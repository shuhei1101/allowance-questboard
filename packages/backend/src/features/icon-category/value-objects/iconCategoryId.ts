import { BaseId, BaseIdSchema } from '@backend/core/value-object/base_id';
import { z } from 'zod';

/**
 * IconCategoryIdのZodスキーマ
 */
export const IconCategoryIdSchema = BaseIdSchema;

/**
 * アイコンカテゴリのIDを表すクラス
 */
export class IconCategoryId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /**
   * IDの名前を返す
   */
  protected get _valueName(): string {
    return `IconCategoryId(${this._value})`;
  }

  /**
   * Zodスキーマから新しいIconCategoryIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): IconCategoryId {
    return new IconCategoryId(data);
  }
}
