import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "src/core/entity/baseTransactionEntity";
import { ChildEntity } from "src/features/child/entity/childEntity";

/**
 * 貯金記録エンティティ
 */
@Entity("savings_records")
@Check("chk_savings_records_amount_not_zero", "amount != 0")
@Check("chk_savings_records_balance_positive", "balance >= 0")
export class SavingsRecordEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  saved_by!: number;
  @Column({ type: "int", nullable: false, default: 0, comment: "貯金額" })
  amount!: number;
  @Column({ type: "int", nullable: false, default: 0, comment: "貯金残高" })
  balance!: number;
  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "貯金記録日時" })
  recorded_at!: Date;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "saved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_savings_records_saved_by" })
  saver!: ChildEntity;
}
