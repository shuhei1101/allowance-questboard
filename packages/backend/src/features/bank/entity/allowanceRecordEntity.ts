import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { AllowanceableTypeEntity } from "./allowanceableTypeEntity";

/**
 * お小遣い記録エンティティ
 */
@Entity("allowance_records")
@Check("chk_allowance_records_amount_positive", "amount >= 0")
export class AllowanceRecordEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  child_id!: number;

  @Column({ type: "int", nullable: true, comment: "お小遣いの種類ID" })
  allowanceable_type?: number;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "お小遣いのタイトル" })
  title!: string;

  @Column({ type: "int", nullable: false, comment: "お小遣い額" })
  amount!: number;

  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "お小遣いが記録された日時" })
  recorded_at!: Date;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_records_child_id" })
  child!: ChildEntity;

  @ManyToOne(() => AllowanceableTypeEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "allowanceable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_allowance_records_allowanceable_type" })
  allowanceable_table_type?: AllowanceableTypeEntity;
}
