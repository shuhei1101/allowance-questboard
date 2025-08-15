import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyEntity } from "src/features/family/entity/familyEntity";
import { FamilyMemberEntity } from "src/features/family-member/entity/familyMemberEntity";

/**
 * 子供エンティティ
 */
@Entity("children")
@Unique("uq_children_family_user", ["family_id", "family_member_id"])
export class ChildEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "家族メンバーID" })
  family_member_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_family_id" })
  family!: FamilyEntity;
  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_family_member_id" })
  family_member!: FamilyMemberEntity;
}
