import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";

/**
 * テンプレートクエストカテゴリエンティティ
 */
@Entity("template_quest_categories")
@Unique("uq_template_quest_categories_category_id", ["categoryId"])
export class TemplateQuestCategoryEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "category_id", type: "int", nullable: false, unique: true, comment: "クエストカテゴリID" })
  categoryId!: number;
  @Column({ name: "sort_order", type: "int", nullable: false, default: 0, comment: "表示順序" })
  sortOrder!: number;
  @Column({ name: "is_active", type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  isActive!: boolean;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_template_quest_categories_category_id" })
  category!: QuestCategoryEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): TemplateQuestCategoryEntity[] {
    return [
      Object.assign(new TemplateQuestCategoryEntity(), { id: 1, categoryId: 1, sortOrder: 1, isActive: true }),
      Object.assign(new TemplateQuestCategoryEntity(), { id: 2, categoryId: 2, sortOrder: 2, isActive: true }),
      Object.assign(new TemplateQuestCategoryEntity(), { id: 3, categoryId: 3, sortOrder: 3, isActive: true }),
    ];
  }
}
