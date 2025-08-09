import { FamilyMemberTypeId } from './familyMemberTypeId';
import { FamilyMemberTypeEntity } from '@backend/features/family-member/entity/familyMemberTypeEntity';
import z from 'zod';
import { BaseSimpleEnumValue } from '@shared/core/enum/baseEnum';

export const FamilyMemberTypeValueSchema = z.object({
  id: z.number(),
  tableName: z.string().optional(),
  description: z.string().optional(),
});

/**
 * 家族メンバータイプの値オブジェクト集約
 * PythonのFamilyMemberTypeValueクラスのTypeScript版
 */
export class FamilyMemberTypeValue extends BaseSimpleEnumValue<FamilyMemberTypeId, FamilyMemberTypeEntity, typeof FamilyMemberTypeValueSchema> {
  private _tableName: string;
  private _description: string;

  constructor(
    id: FamilyMemberTypeId,
    tableName: string = 'unknown',
    description: string = 'Unknown'
  ) {
    super(id);
    this._tableName = tableName;
    this._description = description;
  }

  /**
   * エンティティから値を設定する
   * @param entity 家族メンバータイプエンティティ
   */
  setFromEntity(entity: FamilyMemberTypeEntity): void {
    this._tableName = entity.table_name;
    this._description = entity.description;
  }

  /**
   * テーブル名を返す
   */
  get tableName(): string {
    return this._tableName;
  }

  /**
   * 説明を返す
   */
  get description(): string {
    return this._description;
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof FamilyMemberTypeValueSchema> {
    return {
      id: this._id.value,
      tableName: this._tableName,
      description: this._description,
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化する
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof FamilyMemberTypeValueSchema>): void {
    if (data.id !== this._id.value) {
      throw new Error(`ID mismatch: expected ${this._id.value}, got ${data.id}`);
    }
    this._tableName = data.tableName || 'unknown';
    this._description = data.description || 'Unknown';
  }
}
