import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";

/**
 * レベルサブタイプエンティティ
 */
@Entity("level_table_types")
export class LevelTableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 255, nullable: false, unique: true, comment: "レベルテーブルサブタイプ名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): LevelTableTypeEntity[] {
    return [
      Object.assign(new LevelTableTypeEntity(), { id: 1, table_name: "child_level_tables", description: "子供用レベルテーブル" }),
      Object.assign(new LevelTableTypeEntity(), { id: 2, table_name: "family_level_tables", description: "家族用レベルテーブル" }),
    ];
  }
}
