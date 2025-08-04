import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { ChildEntity } from "./childEntity";

/**
 * 子供のステータスを定義するエンティティ
 */
@Entity("child_statuses")
@Check("chk_child_statuses_current_level_positive", "current_level > 0")
@Check("chk_child_statuses_total_exp_non_negative", "total_exp >= 0")
@Check("chk_child_statuses_current_savings_non_negative", "current_savings >= 0")
@Unique("uq_child_statuses_child_id", ["child_id"])
export class ChildStatusEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, unique: true, comment: "子供ID" })
  child_id!: number;

  @Column({ type: "int", nullable: false, default: 1, comment: "現在のレベル" })
  current_level!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "累計獲得経験値" })
  total_exp!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "現在の貯金額" })
  current_savings!: number;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_statuses_child_id" })
  child!: ChildEntity;
}
