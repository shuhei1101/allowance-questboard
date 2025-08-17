import { BaseId, BaseIdSchema } from "../../../core/value-object/base_id";
import { z } from 'zod';

export class ParentId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /**
   * Zodスキーマから新しいParentIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): ParentId {
    return new ParentId(data.value);
  }
}
