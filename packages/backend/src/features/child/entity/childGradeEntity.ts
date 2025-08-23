import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "./childEntity";
import { EducationEntity } from "@backend/features/child/entity/educationEntity";

/**
 * 子供の現在の学年を定義するエンティティ
 */
@Entity("child_grades")
@Check("chk_child_grade_grade_positive", "grade > 0")
export class ChildGradeEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "子供ID(外部キー)" })
  child_id!: number;
  @Column({ type: "int", nullable: false, comment: "学歴ID" })
  education_id!: number;
  @Column({ type: "int", nullable: false, comment: "学年" })
  grade!: number;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "child_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_grades_child_id" })
  child!: ChildEntity;
  @ManyToOne(() => EducationEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "education_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_child_grades_education_id" })
  education!: EducationEntity;
}
