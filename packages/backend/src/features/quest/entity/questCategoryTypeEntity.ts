import { Entity, Column } from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * クエストカテゴリサブクラステーブルエンティティ
 */
@Entity("quest_category_types")
export class QuestCategoryTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 255, nullable: false, unique: true, comment: "テーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestCategoryTypeEntity[] {
    return [
      Object.assign(new QuestCategoryTypeEntity(), {
        table_name: "template_quest_categories",
        description: "テンプレートカテゴリ",
      }),
      Object.assign(new QuestCategoryTypeEntity(), {
        table_name: "custom_quest_categories",
        description: "家族がカスタムしたカテゴリ",
      }),
    ];
  }
}
