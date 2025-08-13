import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToOne,
} from "typeorm";
import { BaseTransactionEntity } from "src/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "src/core/entity/baseHistoryEntity";
import { ChildEntity } from "./childEntity";

/**
 * 子供設定エンティティ
 */
@Entity("child_settings")
@Unique("uq_child_settings_child_id", ["child_id"])
export class ChildSettingEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, unique: true, comment: "子供ID" })
  child_id!: number;
  @Column({ type: "int", nullable: false, default: 0, comment: "最低貯金額" })
  min_savings!: number;

  @OneToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_settings_child_id" })
  child!: ChildEntity;
}

/**
 * 子供設定履歴エンティティ
 */
@Entity("child_settings_history")
export class ChildSettingHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int" })
  child_id!: number;
  @Column({ type: "int" })
  min_savings!: number;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: ChildSettingHistoryEntity, source: ChildSettingEntity): void {
    instance.child_id = source.child_id;
    instance.min_savings = source.min_savings;
  }
}
