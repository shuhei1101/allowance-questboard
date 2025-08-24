import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "./childEntity";

/**
 * 子供のステータスを定義するエンティティ
 */
@Entity("child_statuses")
@Check("chk_child_statuses_current_level_positive", "current_level > 0")
@Check("chk_child_statuses_total_exp_non_negative", "total_exp >= 0")
@Check("chk_child_statuses_current_savings_non_negative", "current_savings >= 0")
@Unique("uq_child_statuses_child_id", ["childId"])
export class ChildStatusEntity extends BaseTransactionEntity {
  @Column({ name: "child_id", type: "int", nullable: false, unique: true, comment: "子供ID" })
  childId!: number;
  @Column({ name: "current_level", type: "int", nullable: false, default: 1, comment: "現在のレベル" })
  currentLevel!: number;
  @Column({ name: "total_exp", type: "int", nullable: false, default: 0, comment: "累計獲得経験値" })
  totalExp!: number;
  @Column({ name: "current_savings", type: "int", nullable: false, default: 0, comment: "現在の貯金額" })
  currentSavings!: number;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_statuses_child_id" })
  child!: ChildEntity;
}
