import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { FamilyEntity } from "./familyEntity";

@Entity("exp_by_level")
export class ExpByLevelEntity extends BaseTransactionEntity {
  @Column({ name: "family_id", type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;
  @Column({ name: "level", type: "int", nullable: false, comment: "レベル" })
  level!: number;
  @Column({ name: "required_exp", type: "int", nullable: false, comment: "必要経験値" })
  requiredExp!: number;

  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_exp_by_level_family_id" })
  family?: FamilyEntity;

}
