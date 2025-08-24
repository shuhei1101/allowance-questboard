import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("allowance_table_types")
export class AllowanceTableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣いテーブルタイプ名" })
  tableName!: string;

  protected static seedData(): AllowanceTableTypeEntity[] {
    return [
      Object.assign(new AllowanceTableTypeEntity(), { id: 1, tableName: "family_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { id: 2, tableName: "child_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { id: 3, tableName: "shared_allowance_tables" }),
    ];
  }
}
