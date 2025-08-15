import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { AllowanceTableEntity } from "src/features/allowance-table/entity/allowanceTableEntity";

/**
 * レベル別お小遣いテーブルエンティティ
 */
@Entity("allowance_by_level")
@Check("chk_allowance_by_level_level_positive", "level >= 0")
@Check("chk_allowance_by_level_amount_positive", "amount >= 0")
@Unique("uq_allowance_by_level", ["level", "allowance_table_id"])
export class AllowanceByLevelEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "お小遣いテーブルID" })
  allowance_table_id!: number;
  @Column({ type: "int", nullable: false, comment: "レベル" })
  level!: number;
  @Column({ type: "int", nullable: false, default: 0, comment: "お小遣い金額" })
  amount!: number;
  
  @ManyToOne(() => AllowanceTableEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "allowance_table_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_by_level_allowance_table_id" })
  allowance_table!: AllowanceTableEntity;
}
