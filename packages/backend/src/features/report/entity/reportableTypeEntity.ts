import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "../../../core/entity/baseMasterEntity";

/**
 * レポート対象タイプエンティティ
 */
@Entity("reportable_types")
export class ReportableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", length: 50, nullable: false, unique: true, comment: "レポート対象テーブル名" })
  tableName!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "レポート対象タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): ReportableTypeEntity[] {
    return [
      Object.assign(new ReportableTypeEntity(), { id: 1, tableName: "families", description: "家族関連のレポート" }),
      Object.assign(new ReportableTypeEntity(), { id: 2, tableName: "comments", description: "子供関連のレポート" }),
    ];
  }
}
