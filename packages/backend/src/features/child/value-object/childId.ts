import { BaseId, BaseIdSchema } from "../../../core/value-object/base_id";
import { z } from 'zod';

export class ChildId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /**
   * Zodスキーマから新しいChildIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): ChildId {
    return new ChildId(data);
  }
}
