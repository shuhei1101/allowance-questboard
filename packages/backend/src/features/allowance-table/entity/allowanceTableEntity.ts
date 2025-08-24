import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AllowanceTableTypeEntity } from "./allowanceTableTypeEntity";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";

@Entity("allowance_tables")
export class AllowanceTableEntity extends BaseTransactionEntity {
  @Column({ name: "subclass_type", type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclassType!: number;

  @ManyToOne(() => AllowanceTableTypeEntity)
  @JoinColumn({ name: "subclass_type" })
  familyMember?: AllowanceTableTypeEntity;
}
