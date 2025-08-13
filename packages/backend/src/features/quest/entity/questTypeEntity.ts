import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";

/**
 * クエストサブクラスタイプエンティティ
 */
@Entity("quest_types")
export class QuestTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "サブクラスタイプテーブル名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestTypeEntity[] {
    return [
      Object.assign(new QuestTypeEntity(), { id: 1, table_name: "template_quests", description: "テンプレートクエストテーブル" }),
      Object.assign(new QuestTypeEntity(), { id: 2, table_name: "shared_quests", description: "共有クエストテーブル" }),
      Object.assign(new QuestTypeEntity(), { id: 3, table_name: "family_quests", description: "家族クエストテーブル" }),
    ];
  }
}
