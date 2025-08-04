import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * お小遣い支給対象テーブルエンティティ
 */
@Entity("allowanceable_types")
export class AllowanceableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "お小遣い支給対象テーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): AllowanceableTypeEntity[] {
    return [
      Object.assign(new AllowanceableTypeEntity(), {
        table_name: "quest_members",
        description: "メンバーのクエストテーブル",
      }),
    ];
  }
}
