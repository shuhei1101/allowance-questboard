import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "../../../core/entity/baseMasterEntity";

/**
 * レポート対象タイプエンティティ
 */
@Entity("reportable_types")
export class ReportableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "レポート対象テーブル名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "レポート対象タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): ReportableTypeEntity[] {
    return [
      Object.assign(new ReportableTypeEntity(), { id: 1, table_name: "families", description: "家族関連のレポート" }),
      Object.assign(new ReportableTypeEntity(), { id: 2, table_name: "comments", description: "子供関連のレポート" }),
    ];
  }
}
