import { BaseId, BaseIdSchema } from "@backend/core/value-object/base_id";
import { z } from 'zod';

export class FamilyId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /**
   * Zodスキーマから新しいFamilyIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): FamilyId {
    return new FamilyId(data.value);
  }
}
