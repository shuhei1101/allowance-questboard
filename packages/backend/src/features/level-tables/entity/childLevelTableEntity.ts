import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { LevelTableEntity } from "./levelTableEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";

/** 子供用レベルテーブルエンティティ */
@Entity("child_level_tables")
export class ChildLevelTableEntity extends BaseTransactionEntity {
  @Column({ name: "superclass_id", type: "int", nullable: false, comment: "親レベルテーブルID" })
  superclassId!: number;
  @Column({ name: "child_id", type: "int", nullable: false, comment: "子供ID" })
  childId!: number;

  @ManyToOne(() => LevelTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_level_tables_superclass_id" })
  levelTable!: LevelTableEntity;
  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_level_tables_child_id" })
  child!: ChildEntity;
}
