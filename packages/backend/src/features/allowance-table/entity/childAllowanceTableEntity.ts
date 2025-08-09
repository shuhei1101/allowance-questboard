// class ChildAllowanceTablesEntity(BaseEntity):
//     """子供お小遣いテーブルエンティティ"""

import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { AllowanceTableEntity } from "./allowanceTableEntity";

export class ChildAllowanceTableEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "お小遣いテーブルID" })
  superclass_id!: number;
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  child_id!: number;

  @OneToOne(() => AllowanceTableEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_allowance_tables_superclass_id" })
  allowance_table?: AllowanceTableEntity;
  @ManyToOne(() => ChildEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_allowance_tables_child_id" })
  child?: ChildEntity;
}

export class ChildAllowanceTableHistoryEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false })
  superclass_id!: number;
  @Column({ type: "int", nullable: false })
  child_id!: number;

  protected static setSpecificAttrs(instance: ChildAllowanceTableHistoryEntity, source: ChildAllowanceTableEntity): void {
    instance.superclass_id = source.superclass_id;
    instance.child_id = source.child_id;
  }
}
