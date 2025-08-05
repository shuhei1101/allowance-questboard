import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";

/**
 * テンプレートクエストカテゴリエンティティ
 */
@Entity("template_quest_categories")
@Unique("uq_template_quest_categories_category_id", ["category_id"])
export class TemplateQuestCategoryEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, unique: true, comment: "クエストカテゴリID" })
  category_id!: number;
  @Column({ type: "int", nullable: false, default: 0, comment: "表示順序" })
  sort_order!: number;
  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_template_quest_categories_category_id" })
  category!: QuestCategoryEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): TemplateQuestCategoryEntity[] {
    return [
      Object.assign(new TemplateQuestCategoryEntity(), { category_id: 1, sort_order: 1, is_active: true }),
      Object.assign(new TemplateQuestCategoryEntity(), { category_id: 2, sort_order: 2, is_active: true }),
      Object.assign(new TemplateQuestCategoryEntity(), { category_id: 3, sort_order: 3, is_active: true }),
    ];
  }
}
