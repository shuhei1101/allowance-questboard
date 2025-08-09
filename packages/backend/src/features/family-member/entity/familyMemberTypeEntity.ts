import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/**
 * 家族メンバータイプエンティティ
 */
@Entity("family_member_types")
export class FamilyMemberTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", nullable: false, unique: true, comment: "family_memberテーブル名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMemberTypeEntity[] {
    return [
      Object.assign(new FamilyMemberTypeEntity(), { id: 1, table_name: "parents", description: "親" }),
      Object.assign(new FamilyMemberTypeEntity(), { id: 2, table_name: "children",  description: "子供" }),
    ];
  }
}
