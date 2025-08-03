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
 * お小遣い支給対象テーブルエンティティ
 */
@Entity("allowanceable_types")
export class AllowanceableType extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣い支給対象テーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceableType[] {
    return [
      Object.assign(new AllowanceableType(), {
        table_name: "quest_members",
        description: "メンバーのクエストテーブル"
      }),
    ];
  }
}

/**
 * お小遣い記録エンティティ
 */
@Entity("allowance_records")
@Check("chk_allowance_records_amount_positive", "amount >= 0")
export class AllowanceRecord extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  child_id!: number;

  @Column({ type: "int", nullable: true, comment: "お小遣いの種類ID" })
  allowanceable_type!: number;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "お小遣いのタイトル" })
  title!: string;

  @Column({ type: "int", nullable: false, comment: "お小遣い額" })
  amount!: number;

  @Column({ type: "timestamp with time zone", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "お小遣いが記録された日時" })
  recorded_at!: Date;

  // リレーションは後で追加予定
  // @ManyToOne(() => Child, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_records_child_id" })
  // child!: Child;

  @ManyToOne(() => AllowanceableType, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "allowanceable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_records_allowanceable_type" })
  allowanceable_table_type?: AllowanceableType;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceRecord[] {
    // 実際のデータは動的に作成されるためシードデータなし
    return [];
  }
}
