import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToOne,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { ChildEntity } from "./childEntity";

/** 子供設定エンティティ */
@Entity("child_settings")
export class ChildSettingEntity extends BaseTransactionEntity {
  @Column({ name: "child_id", type: "int", nullable: false, unique: true, comment: "子供ID" })
  childId!: number;
  @Column({ name: "min_savings", type: "int", nullable: false, default: 0, comment: "最低貯金額" })
  minSavings!: number;

  @OneToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_settings_child_id" })
  child!: ChildEntity;
}

/** 子供設定履歴エンティティ */
@Entity("child_settings_history")
export class ChildSettingHistoryEntity extends BaseHistoryEntity {
  @Column({ name: "child_id", type: "int" })
  childId!: number;
  @Column({ name: "min_savings", type: "int" })
  minSavings!: number;

  /** サブクラス固有の属性をセット */
  protected static setSpecificAttrs(instance: ChildSettingHistoryEntity, source: ChildSettingEntity): void {
    instance.childId = source.childId;
    instance.minSavings = source.minSavings;
  }
}
