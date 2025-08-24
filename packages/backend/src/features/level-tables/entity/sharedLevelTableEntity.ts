import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyLevelTableEntity } from "./familyLevelTableEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/** 保存された共有レベルテーブルエンティティ */
@Entity("shared_level_tables")
@Unique("uq_shared_level_tables_family_level_table_shared_by", ["familyLevelTableId", "sharedBy"])
export class SharedLevelTableEntity extends BaseTransactionEntity {
  @Column({ name: "family_level_table_id", type: "int", nullable: false, comment: "共有レベルテーブルID(外部キー)" })
  familyLevelTableId!: number;
  @Column({ name: "shared_by", type: "int", nullable: false, comment: "家族ID" })
  sharedBy!: number;

  @ManyToOne(() => FamilyLevelTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_level_table_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_level_tables_family_level_table_id" })
  familyLevelTable!: FamilyLevelTableEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_level_tables_shared_by" })
  family!: FamilyEntity;
}
