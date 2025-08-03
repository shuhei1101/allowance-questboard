import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * 貯金記録エンティティ
 */
@Entity("savings_records")
@Check("chk_savings_records_amount_not_zero", "amount != 0")
@Check("chk_savings_records_balance_positive", "balance >= 0")
export class SavingsRecord extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  saved_by!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "貯金額" })
  amount!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "貯金残高" })
  balance!: number;

  @Column({ type: "timestamp with time zone", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "貯金記録日時" })
  recorded_at!: Date;

  // リレーションは後で追加予定
  // @ManyToOne(() => Child, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "saved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_savings_records_saved_by" })
  // saver!: Child;

  /**
   * シード用データ取得
   */
  protected static seedData(): SavingsRecord[] {
    // 実際のデータは動的に作成されるためシードデータなし
    return [];
  }
}
