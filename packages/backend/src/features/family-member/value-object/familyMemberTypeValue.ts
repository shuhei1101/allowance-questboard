import z from 'zod';
import { BaseSimpleEnumValue } from '../../../core/enum/baseEnum';
import { FamilyMemberTypeEntity } from '../entity/familyMemberTypeEntity';
import { FamilyMemberTypeId } from './familyMemberTypeId';
import { TableName, TableNameSchema } from '@backend/features/shared/value-object/tableName';
import { BaseIdSchema } from '@backend/core/value-object/base_id';

export const FamilyMemberTypeValueSchema = z.object({
  id: BaseIdSchema,
  tableName: TableNameSchema.optional(),
  description: z.string().optional(),
});

/**
 * 家族メンバータイプの値オブジェクト集約
 * PythonのFamilyMemberTypeValueクラスのTypeScript版
 */
export class FamilyMemberTypeValue extends BaseSimpleEnumValue<FamilyMemberTypeId, FamilyMemberTypeEntity, typeof FamilyMemberTypeValueSchema> {
  private _tableName: TableName;
  private _description: string;

  constructor(
    id: FamilyMemberTypeId,
    tableName: TableName = new TableName('unknown'),
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
    this._tableName = new TableName(entity.tableName);
    this._description = entity.description;
  }

  /**
   * テーブル名を返す
   */
  get tableName(): string {
    return this._tableName.toString();
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
      tableName: this._tableName.toZodData(),
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
    this._tableName = TableName.fromZodData(data.tableName || 'unknown');
    this._description = data.description || 'Unknown';
  }
}
