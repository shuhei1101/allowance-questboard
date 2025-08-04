import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DataSource,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("quest_categories_translation")
@Unique("uq_quest_categories_translation_category_language", ["quest_category_id", "language_id"])
export class QuestCategoryTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエストカテゴリID" })
  quest_category_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "カテゴリ説明の翻訳" })
  description?: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => QuestCategoryEntity)
  @JoinColumn({ name: "quest_category_id" })
  questCategory?: QuestCategoryEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestCategoryTranslationEntity[] {
    return [
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 1, language_id: 1, name: "お掃除", description: "家の掃除に関するタスク" }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 1, language_id: 2, name: "Cleaning", description: "Tasks related to house cleaning" }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 2, language_id: 1, name: "宿題", description: "学校の課題に関するタスク" }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 2, language_id: 2, name: "Homework", description: "Tasks related to school assignments" }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 3, language_id: 1, name: "運動", description: "体を動かすタスク" }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 3, language_id: 2, name: "Exercise", description: "Physical activity tasks" }),
    ];
  }
}
