import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("allowance_table_types")
export class AllowanceTableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣いテーブルタイプ名" })
  table_name!: string;

  protected static seedData(): AllowanceTableTypeEntity[] {
    return [
      Object.assign(new AllowanceTableTypeEntity(), { id: 1, table_name: "family_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { id: 2, table_name: "child_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { id: 3, table_name: "shared_allowance_tables" }),
    ];
  }
}
