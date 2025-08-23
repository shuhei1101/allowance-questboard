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

/**
 * 親エンティティ
 */
@Entity("parents")
@Unique("uq_parents_family_user", ["family_id", "family_member_id"])
export class ParentEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "家族メンバーID" })
  familyMemberId!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_parent_family_id" })
  family!: FamilyEntity;
  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_parent_family_member_id" })
  familyMember!: FamilyMemberEntity;

  static fromRaw(params: {
    id?: number;
    familyId: number;
    familyMemberId: number;
  }): ParentEntity {
    const entity = new ParentEntity();
    if ( params.id !== undefined ) entity.id = params.id;
    entity.familyId = params.familyId;
    entity.familyMemberId = params.familyMemberId;
    return entity;
  }
}
