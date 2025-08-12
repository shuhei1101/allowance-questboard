import { BaseSimpleEnum } from '../../../core/enum/baseEnum';
import { FamilyMemberTypeId } from '../value-object/familyMemberTypeId';
import { FamilyMemberTypeValue, FamilyMemberTypeValueSchema } from '../value-object/familyMemberTypeValue';
import { FamilyMemberTypeEntity } from '@backend/features/family-member/entity/familyMemberTypeEntity';
import { z } from "zod";

/**
 * 家族メンバータイプの種類
 * zodスキーマ
 */
export const FamilyMemberTypeSchema = z.object({
  parent: FamilyMemberTypeValueSchema,
  child: FamilyMemberTypeValueSchema
});

/**
 * 家族メンバータイプの種類
 * 疑似Enumクラス
 */
class FamilyMemberTypeEnum extends BaseSimpleEnum<FamilyMemberTypeValue, FamilyMemberTypeId, FamilyMemberTypeEntity, typeof FamilyMemberTypeSchema> {
  readonly PARENT = new FamilyMemberTypeValue(new FamilyMemberTypeId(1));
  readonly CHILD = new FamilyMemberTypeValue(new FamilyMemberTypeId(2));

  /**
   * すべてのEnum値を返す（基底クラスの抽象メソッド実装）
   */
  getAllValues(): FamilyMemberTypeValue[] {
    return [this.PARENT, this.CHILD];
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof FamilyMemberTypeSchema> {
    return {
      parent: this.PARENT.toZodData(),
      child: this.CHILD.toZodData(),
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化する
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof FamilyMemberTypeSchema>): void {
    if (data.parent) {
      this.PARENT.setFromZodData(data.parent);
    }
    if (data.child) {
      this.CHILD.setFromZodData(data.child);
    }
  }
}

export const FamilyMemberType = new FamilyMemberTypeEnum()
