import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";

/**
 * お小遣い記録エンティティ
 */
@Entity("allowanceable_types")
export class AllowanceableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣い支給対象テーブル名" })
  tableName!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceableTypeEntity[] {
    return [
      Object.assign(new AllowanceableTypeEntity(), { id: 1, tableName: "quest_members", description: "メンバーのクエストテーブル" }),
    ];
  }
}
