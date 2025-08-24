// class ChildAllowanceTablesEntity(BaseEntity):
//     """子供お小遣いテーブルエンティティ"""

import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { AllowanceTableEntity } from "./allowanceTableEntity";

export class ChildAllowanceTableEntity extends BaseTransactionEntity {
  @Column({ name: "superclass_id", type: "int", nullable: false, comment: "お小遣いテーブルID" })
  superclassId!: number;
  @Column({ name: "child_id", type: "int", nullable: false, comment: "子供ID" })
  childId!: number;

  @OneToOne(() => AllowanceTableEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "superclass_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_allowance_tables_superclass_id" })
  allowanceTable?: AllowanceTableEntity;
  @ManyToOne(() => ChildEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_allowance_tables_child_id" })
  child?: ChildEntity;
}

export class ChildAllowanceTableHistoryEntity extends BaseTransactionEntity {
  @Column({ name: "superclass_id", type: "int", nullable: false })
  superclassId!: number;
  @Column({ name: "child_id", type: "int", nullable: false })
  childId!: number;

  protected static setSpecificAttrs(instance: ChildAllowanceTableHistoryEntity, source: ChildAllowanceTableEntity): void {
    instance.superclassId = source.superclassId;
    instance.childId = source.childId;
  }
}
