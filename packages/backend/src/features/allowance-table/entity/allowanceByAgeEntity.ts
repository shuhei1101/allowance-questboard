import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { AllowanceTableEntity } from "./allowanceTableEntity";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";

/**
 * 年齢別お小遣いテーブルエンティティ
 */
@Entity("allowance_by_age")
@Check("chk_allowance_by_age_age_positive", "age >= 0")
@Check("chk_allowance_by_age_amount_positive", "amount >= 0")
@Unique("uq_allowance_by_age_age_allowance_table", ["age", "allowanceTableId"])
export class AllowanceByAgeEntity extends BaseTransactionEntity {
  @Column({ name: "allowance_table_id", type: "int", nullable: false, comment: "お小遣いテーブルID" })
  allowanceTableId!: number;
  @Column({ name: "age", type: "int", nullable: false, comment: "年齢" })
  age!: number;
  @Column({ name: "amount", type: "int", nullable: false, default: 0, comment: "お小遣い額" })
  amount!: number;

  @ManyToOne(() => AllowanceTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "allowance_table_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_by_age_table_id" })
  allowanceTable!: AllowanceTableEntity;
}

@Entity("allowance_by_age_history")
export class AllowanceByAgeHistoryEntity extends BaseHistoryEntity {
  @Column({ name: "allowance_table_id", type: "int" })
  allowanceTableId!: number;
  @Column({ name: "age", type: "int" })
  age!: number;
  @Column({ name: "amount", type: "int" })
  amount!: number;

  protected static setSpecificAttrs(instance: AllowanceByAgeHistoryEntity, source: AllowanceByAgeEntity): void {
    instance.allowanceTableId = source.allowanceTableId;
    instance.age = source.age;
    instance.amount = source.amount;
  }
}
