import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { FamilyMember } from "@backend/features/family-member/entity/familyMember";
import { Family } from "@backend/features/family/entity/family";

/**
 * 子供エンティティ
 */
@Entity("children")
@Unique("uq_children_family_user", ["family_id", "family_member_id"])
export class Child extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "家族メンバーID" })
  family_member_id!: number;

  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;

  @ManyToOne(() => Family, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_children_family_id" })
  family!: Family;

  @ManyToOne(() => FamilyMember, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_children_family_member_id" })
  family_member!: FamilyMember;

  /**
   * シード用データ取得
   */
  protected static seedData(): Child[] {
    // 基本的にはシードデータなし（ユーザ登録時に作成される）
    return [];
  }
}
