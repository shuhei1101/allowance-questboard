import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";

/** カスタムクエストカテゴリエンティティ */
@Entity("custom_quest_categories")
@Unique("uq_custom_quest_categories_category_id", ["categoryId"])
export class CustomQuestCategoryEntity extends BaseTransactionEntity {
  @Column({ name: "category_id", type: "int", nullable: false, unique: true, comment: "クエストカテゴリID" })
  categoryId!: number;
  @Column({ name: "family_id", type: "int", nullable: false, comment: "作成者の家族ID" })
  familyId!: number;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_custom_quest_categories_category_id" })
  category!: QuestCategoryEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_custom_quest_categories_family_id" })
  family!: FamilyEntity;
}
