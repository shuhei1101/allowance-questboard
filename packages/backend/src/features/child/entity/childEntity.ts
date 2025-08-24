import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";

/** 子供エンティティ */
@Entity("children")
@Unique("uq_children_family_user", ["familyId", "familyMemberId"])
export class ChildEntity extends BaseTransactionEntity {
  @Column({ name: "family_member_id", type: "int", nullable: false, comment: "家族メンバーID" })
  familyMemberId!: number;
  @Column({ name: "family_id", type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_family_id" })
  family!: FamilyEntity;
  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_family_member_id" })
  familyMember!: FamilyMemberEntity;
}
