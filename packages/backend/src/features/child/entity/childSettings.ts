import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";

/**
 * 子供設定エンティティ
 */
@Entity("child_settings")
export class ChildSettings extends AppBaseEntity {
  @Column({ type: "int", nullable: false, unique: true, comment: "子供ID" })
  child_id!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "最低貯金額" })
  min_savings!: number;

  // リレーションは後で追加予定
  // @ManyToOne(() => Child, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_settings_child_id" })
  // child!: Child;

  /**
   * シード用データ取得
   */
  protected static seedData(): ChildSettings[] {
    // 実際のデータは動的に作成されるためシードデータなし
    return [];
  }
}

/**
 * 子供設定履歴エンティティ
 */
@Entity("child_settings_history")
export class ChildSettingsHistory extends BaseHistoryEntity<ChildSettings> {
  @Column({ type: "int" })
  child_id!: number;

  @Column({ type: "int" })
  min_savings!: number;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: ChildSettingsHistory, source: ChildSettings): void {
    instance.child_id = source.child_id;
    instance.min_savings = source.min_savings;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): ChildSettingsHistory[] {
    return [];
  }
}

/**
 * 子供のステータスを定義するエンティティ
 */
@Entity("child_statuses")
@Check("chk_child_statuses_current_level_positive", "current_level > 0")
@Check("chk_child_statuses_total_exp_non_negative", "total_exp >= 0")
@Check("chk_child_statuses_current_savings_non_negative", "current_savings >= 0")
export class ChildStatus extends AppBaseEntity {
  @Column({ type: "int", nullable: false, unique: true, comment: "子供ID" })
  child_id!: number;

  @Column({ type: "int", nullable: false, default: 1, comment: "現在のレベル" })
  current_level!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "累計獲得経験値" })
  total_exp!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "現在の貯金額" })
  current_savings!: number;

  // リレーションは後で追加予定
  // @ManyToOne(() => Child, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_statuses_child_id" })
  // child!: Child;

  /**
   * シード用データ取得
   */
  protected static seedData(): ChildStatus[] {
    // 実際のデータは動的に作成されるためシードデータなし
    return [];
  }
}
