import { BaseId, BaseIdSchema } from '@backend/core/value-object/base_id';
import { z } from 'zod';

/**
 * アイコンのIDを表すクラス
 */
export class IconId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /**
   * IDの名前を返す
   */
  protected get _valueName(): string {
    return `IconId(${this._value})`;
  }

  /**
   * Zodスキーマから新しいIconIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): IconId {
    return new IconId(data.value);
  }
}
