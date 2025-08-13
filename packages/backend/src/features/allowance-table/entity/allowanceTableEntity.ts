import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AllowanceTableTypeEntity } from "./allowanceTableTypeEntity";
import { BaseTransactionEntity } from "src/core/entity/baseTransactionEntity";

@Entity("allowance_tables")
export class AllowanceTableEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclass_type!: number;

  @ManyToOne(() => AllowanceTableTypeEntity)
  @JoinColumn({ name: "subclass_type" })
  familyMember?: AllowanceTableTypeEntity;
}
