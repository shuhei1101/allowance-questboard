import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";

/**
 * 年齢別お小遣いテーブルエンティティ
 */
@Entity("allowance_by_age")
@Check("chk_allowance_by_age_age_positive", "age >= 0")
@Check("chk_allowance_by_age_amount_positive", "amount >= 0")
@Unique("uq_allowance_by_age_age_allowance_table", ["age", "allowance_table_id"])
export class AllowanceByAgeEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "お小遣いテーブルID" })
  allowance_table_id!: number;

  @Column({ type: "int", nullable: false, comment: "年齢" })
  age!: number;

  @Column({ type: "int", nullable: false, default: 0, comment: "お小遣い額" })
  amount!: number;

  // TODO: AllowanceTablesEntity が作成されたら追加
  // @ManyToOne(() => AllowanceTablesEntity, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "allowance_table_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_by_age_table_id" })
  // allowance_tables!: AllowanceTablesEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceByAgeEntity[] {
    return [
      // シードデータがある場合はここに追加
    ];
  }
}

/**
 * 年齢別お小遣い履歴テーブルエンティティ
 */
@Entity("allowance_by_age_history")
export class AllowanceByAgeHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", comment: "お小遣いテーブルID" })
  allowance_table_id!: number;

  @Column({ type: "int", comment: "年齢" })
  age!: number;

  @Column({ type: "int", comment: "お小遣い額" })
  amount!: number;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: AllowanceByAgeHistoryEntity, source: AllowanceByAgeEntity): void {
    instance.allowance_table_id = source.allowance_table_id;
    instance.age = source.age;
    instance.amount = source.amount;
  }
}
