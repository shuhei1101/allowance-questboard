import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * 家族メンバータイプエンティティ
 */
@Entity("family_member_types")
export class FamilyMemberType extends AppBaseEntity {
  @Column({ type: "varchar", nullable: false, unique: true, comment: "family_memberテーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMemberType[] {
    return [
      Object.assign(new FamilyMemberType(), {
        table_name: "parents",
        description: "親"
      }),
      Object.assign(new FamilyMemberType(), {
        table_name: "children",
        description: "子供"
      }),
    ];
  }
}
