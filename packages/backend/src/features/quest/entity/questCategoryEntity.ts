import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import { BaseMasterTranslationEntity } from "@backend/core/entity/baseTranslationEntity";
import { QuestCategoryTypeEntity } from "./questCategoryTypeEntity";

/**
 * クエストカテゴリエンティティ
 */
@Entity("quest_categories")
export class QuestCategoryEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "subclass_type", type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclassType!: number;

  @ManyToOne(() => QuestCategoryTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "subclass_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_categories_subclass_type" })
  subclassTypeRef!: QuestCategoryTypeEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestCategoryEntity[] {
    return [
      Object.assign(new QuestCategoryEntity(), { id: 1, subclassType: 1 }), // 1 家事
      Object.assign(new QuestCategoryEntity(), { id: 2, subclassType: 1 }), // 2 勉強
      Object.assign(new QuestCategoryEntity(), { id: 3, subclassType: 1 }), // 3 運動
    ];
  }
}

/**
 * クエストカテゴリ翻訳エンティティ
 */
@Entity("quest_categories_translation")
@Unique("uq_quest_categories_translation_category_language", ["questCategoryId", "languageId"])
@Check("chk_quest_categories_translation_name_not_empty", "length(name) > 0")
export class QuestCategoryTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ name: "quest_category_id", type: "int", nullable: false, comment: "クエストカテゴリID" })
  questCategoryId!: number;
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_category_translation_category_id" })
  questCategory!: QuestCategoryEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.questCategoryId;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestCategoryTranslationEntity[] {
    return [
      Object.assign(new QuestCategoryTranslationEntity(), { questCategory: 1, name: "家事", language_id: 1 }),
      Object.assign(new QuestCategoryTranslationEntity(), { questCategory: 1, name: "Housework", language_id: 2 }),
      Object.assign(new QuestCategoryTranslationEntity(), { questCategory: 2, name: "勉強", language_id: 1 }),
      Object.assign(new QuestCategoryTranslationEntity(), { questCategory: 2, name: "Study", language_id: 2 }),
      Object.assign(new QuestCategoryTranslationEntity(), { questCategory: 3, name: "運動", language_id: 1 }),
      Object.assign(new QuestCategoryTranslationEntity(), { questCategory: 3, name: "Exercise", language_id: 2 }),
    ];
  }
}
