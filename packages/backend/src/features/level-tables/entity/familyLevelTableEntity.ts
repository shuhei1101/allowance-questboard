import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { LevelTableEntity } from "./levelTableEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/**
 * 家族用レベルテーブルエンティティ
 */
@Entity("family_level_tables")
export class FamilyLevelTableEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "親レベルテーブルID" })
  superclass_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;
  @Column({ type: "boolean", nullable: false, default: false, comment: "公開フラグ" })
  is_public!: boolean;

  @ManyToOne(() => LevelTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_level_tables_superclass_id" })
  level_table!: LevelTableEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_level_tables_family_id" })
  family!: FamilyEntity;
}
