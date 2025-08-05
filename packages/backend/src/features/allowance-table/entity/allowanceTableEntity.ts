import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { AllowanceTableTypeEntity } from "./allowanceTableTypeEntity";

@Entity("allowance_tables")
export class AllowanceTableEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclass_type!: number;

  @ManyToOne(() => AllowanceTableTypeEntity)
  @JoinColumn({ name: "subclass_type" })
  familyMember?: AllowanceTableTypeEntity;
}
