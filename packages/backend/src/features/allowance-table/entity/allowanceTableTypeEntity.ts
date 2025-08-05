import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { Entity, Column } from "typeorm";

@Entity("allowance_table_types")
export class AllowanceTableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣いテーブルタイプ名" })
  table_name!: string;

  protected static seedData(): AllowanceTableTypeEntity[] {
    return [
      Object.assign(new AllowanceTableTypeEntity(), { table_name: "family_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { table_name: "child_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { table_name: "shared_allowance_tables" }),
    ];
  }
}
