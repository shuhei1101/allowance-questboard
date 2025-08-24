import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";

/**
 * 貯金記録エンティティ
 */
@Entity("savings_records")
@Check("chk_savings_records_amount_not_zero", "amount != 0")
@Check("chk_savings_records_balance_positive", "balance >= 0")
export class SavingsRecordEntity extends BaseTransactionEntity {
  @Column({ name: "saved_by", type: "int", nullable: false, comment: "子供ID" })
  savedBy!: number;
  @Column({ name: "amount", type: "int", nullable: false, default: 0, comment: "貯金額" })
  amount!: number;
  @Column({ name: "balance", type: "int", nullable: false, default: 0, comment: "貯金残高" })
  balance!: number;
  @Column({ name: "recorded_at", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "貯金記録日時" })
  recordedAt!: Date;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "saved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_savings_records_saved_by" })
  saver!: ChildEntity;
}
