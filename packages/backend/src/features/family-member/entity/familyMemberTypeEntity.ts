import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/** 家族メンバータイプエンティティ */
@Entity("family_member_types")
export class FamilyMemberTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", nullable: false, unique: true, comment: "family_memberテーブル名" })
  tableName!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /** シード用データ取得 */
  protected static seedData(): FamilyMemberTypeEntity[] {
    return [
      Object.assign(new FamilyMemberTypeEntity(), { id: 1, tableName: "parents", description: "親" }),
      Object.assign(new FamilyMemberTypeEntity(), { id: 2, tableName: "children",  description: "子供" }),
    ];
  }
}
