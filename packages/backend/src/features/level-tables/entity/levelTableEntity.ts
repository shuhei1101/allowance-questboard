import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { LevelTableTypeEntity } from "./levelTableTypeEntity";

/**
 * レベルテーブル基底クラスエンティティ
 */
@Entity("level_tables")
@Check("chk_level_tables_subclass_type_positive", "subclass_type >= 0")
export class LevelTableEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclass_type!: number;

  @ManyToOne(() => LevelTableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "subclass_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_level_tables_subclass_type" })
  level_table_type!: LevelTableTypeEntity;
}
