import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { AllowanceableTypeEntity } from "./allowanceableTypeEntity";

/**
 * お小遣い記録エンティティ
 */
@Entity("allowance_records")
@Check("chk_allowance_records_amount_positive", "amount >= 0")
export class AllowanceRecordEntity extends BaseTransactionEntity {
  @Column({ name: "child_id", type: "int", nullable: false, comment: "子供ID" })
  childId!: number;
  @Column({ name: "allowanceable_type", type: "int", nullable: true, comment: "お小遣いの種類ID" })
  allowanceableType?: number;
  @Column({ name: "title", type: "varchar", length: 255, nullable: false, comment: "お小遣いのタイトル" })
  title!: string;
  @Column({ name: "amount", type: "int", nullable: false, comment: "お小遣い額" })
  amount!: number;
  @Column({ name: "recorded_at", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "お小遣いが記録された日時" })
  recordedAt!: Date;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_records_child_id" })
  child!: ChildEntity;
  @ManyToOne(() => AllowanceableTypeEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "allowanceable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_records_allowanceable_type" })
  allowanceableTableType?: AllowanceableTypeEntity;
}
