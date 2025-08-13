import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "src/core/entity/baseTransactionEntity";
import { ChildEntity } from "src/features/child/entity/childEntity";
import { EducationEntity } from "src/features/child/entity/educationEntity";

/**
 * 子供の教育期間を定義するエンティティ
 * 
 * 例えば、小学校は6年間、中学校は3年間、高校は3年間など、教育機関ごとに期間を定義する
 * これにより、子供の学歴履歴を管理し、教育機関ごとの期間を追跡できるようにする
 * 子供を作成したときに初期値が設定され、親が自由に設定可能
 */
@Entity("education_periods")
@Check("chk_education_periods_period_positive", "period > 0")
@Unique("uq_education_periods_child_education", ["child_id", "education_id"])
export class EducationPeriodEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  child_id!: number;
  @Column({ type: "int", nullable: false, comment: "学歴ID" })
  education_id!: number;
  @Column({ type: "int", nullable: false, comment: "教育期間" })
  period!: number;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_education_period_child_id" })
  child!: ChildEntity;
  @ManyToOne(() => EducationEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "education_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_education_period_education_id" })
  education!: EducationEntity;
}
