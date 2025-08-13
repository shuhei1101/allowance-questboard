import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";

/**
 * お小遣い記録エンティティ
 */
@Entity("allowanceable_types")
export class AllowanceableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣い支給対象テーブル名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceableTypeEntity[] {
    return [
      Object.assign(new AllowanceableTypeEntity(), { id: 1, table_name: "quest_members", description: "メンバーのクエストテーブル" }),
    ];
  }
}
