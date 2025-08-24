import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { LevelTableEntity } from "./levelTableEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/** 家族用レベルテーブルエンティティ */
@Entity("family_level_tables")
export class FamilyLevelTableEntity extends BaseTransactionEntity {
  @Column({ name: "superclass_id", type: "int", nullable: false, comment: "親レベルテーブルID" })
  superclassId!: number;
  @Column({ name: "family_id", type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;
  @Column({ name: "is_public", type: "boolean", nullable: false, default: false, comment: "公開フラグ" })
  isPublic!: boolean;

  @ManyToOne(() => LevelTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_level_tables_superclass_id" })
  levelTable!: LevelTableEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_level_tables_family_id" })
  family!: FamilyEntity;
}
