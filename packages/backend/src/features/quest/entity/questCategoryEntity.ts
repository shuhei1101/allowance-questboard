import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseTranslationEntity } from "@backend/core/entity/baseTranslationEntity";
import { QuestCategoryTypeEntity } from "./questCategoryTypeEntity";

/**
 * クエストカテゴリエンティティ
 */
@Entity("quest_categories")
export class QuestCategoryEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclass_type!: number;

  @ManyToOne(() => QuestCategoryTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "subclass_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_categories_subclass_type" })
  subclass_type_ref!: QuestCategoryTypeEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestCategoryEntity[] {
    return [
      Object.assign(new QuestCategoryEntity(), { subclass_type: 1 }), // 1 家事
      Object.assign(new QuestCategoryEntity(), { subclass_type: 1 }), // 2 勉強
      Object.assign(new QuestCategoryEntity(), { subclass_type: 1 }), // 3 運動
    ];
  }
}

/**
 * クエストカテゴリ翻訳エンティティ
 */
@Entity("quest_categories_translation")
@Unique("uq_quest_categories_translation_category_language", ["quest_category_id", "language_id"])
@Check("chk_quest_categories_translation_name_not_empty", "length(name) > 0")
export class QuestCategoryTranslationEntity extends BaseTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "クエストカテゴリID" })
  quest_category_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_category_translation_category_id" })
  quest_category!: QuestCategoryEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.quest_category_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestCategoryTranslationEntity[] {
    return [
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 1, name: "家事", language_id: 1 }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 1, name: "Housework", language_id: 2 }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 2, name: "勉強", language_id: 1 }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 2, name: "Study", language_id: 2 }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 3, name: "運動", language_id: 1 }),
      Object.assign(new QuestCategoryTranslationEntity(), { quest_category_id: 3, name: "Exercise", language_id: 2 }),
    ];
  }
}
