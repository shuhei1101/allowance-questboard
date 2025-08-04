import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/**
 * カスタムクエストカテゴリエンティティ
 */
@Entity("custom_quest_categories")
@Unique("uq_custom_quest_categories_category_id", ["category_id"])
export class CustomQuestCategoryEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, unique: true, comment: "クエストカテゴリID" })
  category_id!: number;

  @Column({ type: "int", nullable: false, comment: "作成者の家族ID" })
  family_id!: number;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_custom_quest_categories_category_id" })
  category!: QuestCategoryEntity;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_custom_quest_categories_family_id" })
  family!: FamilyEntity;
}
