import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * クエストサブクラスタイプエンティティ
 */
@Entity("quest_types")
export class QuestTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "サブクラスタイプテーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestTypeEntity[] {
    return [
      Object.assign(new QuestTypeEntity(), {
        table_name: "template_quests",
        description: "テンプレートクエストテーブル",
      }),
      Object.assign(new QuestTypeEntity(), {
        table_name: "shared_quests",
        description: "共有クエストテーブル",
      }),
      Object.assign(new QuestTypeEntity(), {
        table_name: "family_quests",
        description: "家族クエストテーブル",
      }),
    ];
  }
}
