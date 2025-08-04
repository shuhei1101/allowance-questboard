import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * お小遣いテーブルサブタイプエンティティ
 */
@Entity("allowance_table_types")
export class AllowanceTableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 255, nullable: false, unique: true, comment: "テーブル名" })
  table_name!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceTableTypeEntity[] {
    return [
      Object.assign(new AllowanceTableTypeEntity(), { table_name: "family_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { table_name: "child_allowance_tables" }),
      Object.assign(new AllowanceTableTypeEntity(), { table_name: "shared_allowance_tables" }),
    ];
  }
}
