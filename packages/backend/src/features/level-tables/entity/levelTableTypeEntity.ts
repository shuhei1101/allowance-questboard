import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/** レベルサブタイプエンティティ */
@Entity("level_table_types")
export class LevelTableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", length: 255, nullable: false, unique: true, comment: "レベルテーブルサブタイプ名" })
  tableName!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /** シード用データ取得 */
  protected static seedData(): LevelTableTypeEntity[] {
    return [
      Object.assign(new LevelTableTypeEntity(), { id: 1, tableName: "child_level_tables", description: "子供用レベルテーブル" }),
      Object.assign(new LevelTableTypeEntity(), { id: 2, tableName: "family_level_tables", description: "家族用レベルテーブル" }),
    ];
  }
}
