import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * 家族メンバータイプエンティティ
 */
@Entity("family_member_types")
export class FamilyMemberTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", nullable: false, unique: true, comment: "family_memberテーブル名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMemberTypeEntity[] {
    return [
      Object.assign(new FamilyMemberTypeEntity(), { table_name: "parents", description: "親" }),
      Object.assign(new FamilyMemberTypeEntity(), { table_name: "children",  description: "子供" }),
    ];
  }
}
