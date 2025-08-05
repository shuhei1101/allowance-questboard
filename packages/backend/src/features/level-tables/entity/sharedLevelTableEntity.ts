import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { FamilyLevelTableEntity } from "./familyLevelTableEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/**
 * 保存された共有レベルテーブルエンティティ
 */
@Entity("shared_level_tables")
@Unique("uq_shared_level_tables_family_level_table_shared_by", ["family_level_table_id", "shared_by"])
export class SharedLevelTableEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "共有レベルテーブルID(外部キー)" })
  family_level_table_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  shared_by!: number;

  @ManyToOne(() => FamilyLevelTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_level_table_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_level_tables_family_level_table_id" })
  family_level_table!: FamilyLevelTableEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_level_tables_shared_by" })
  family!: FamilyEntity;
}
