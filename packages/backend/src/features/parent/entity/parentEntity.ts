import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";

/**
 * 親エンティティ
 */
@Entity("parents")
@Unique("uq_parents_family_user", ["family_id", "family_member_id"])
export class ParentEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "家族メンバーID" })
  family_member_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_parent_family_id" })
  family!: FamilyEntity;
  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_parent_family_member_id" })
  family_member!: FamilyMemberEntity;
}
