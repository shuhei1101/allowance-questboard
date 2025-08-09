import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import { BaseMasterTranslationEntity } from "@backend/core/entity/baseTranslationEntity";
import { LanguageEntity } from "@backend/features/language/entity/languageEntity";

/**
 * アイコンカテゴリエンティティ
 */
@Entity("icon_categories")
export class IconCategoryEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "int", default: 0, comment: "表示順序" })
  sort_order!: number;
  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategoryEntity[] {
    return [
      Object.assign(new IconCategoryEntity(), { id: 1, sort_order: 1, is_active: true }),
      Object.assign(new IconCategoryEntity(), { id: 2, sort_order: 2, is_active: true }),
      Object.assign(new IconCategoryEntity(), { id: 3, sort_order: 3, is_active: true }),
    ];
  }
}

/**
 * アイコンカテゴリ翻訳エンティティ
 */
@Entity("icon_categories_translation")
@Unique("uq_icon_categories_translation_category_language", ["category_id", "language_id"])
export class IconCategoryTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "アイコンカテゴリID" })
  category_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  @ManyToOne(() => IconCategoryEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icon_category_id" })
  category!: IconCategoryEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.category_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategoryTranslationEntity[] {
    return [
      Object.assign(new IconCategoryTranslationEntity(), { category_id: 1, language_id: 1, name: "アクション" }),
      Object.assign(new IconCategoryTranslationEntity(), { category_id: 1, language_id: 2, name: "Action" }),
      Object.assign(new IconCategoryTranslationEntity(), { category_id: 2, language_id: 1, name: "ナビゲーション" }),
      Object.assign(new IconCategoryTranslationEntity(), { category_id: 2, language_id: 2, name: "Navigation" }),
      Object.assign(new IconCategoryTranslationEntity(), { category_id: 3, language_id: 1, name: "コミュニケーション" }),
      Object.assign(new IconCategoryTranslationEntity(), { category_id: 3, language_id: 2, name: "Communication" }),
    ];
  }
}
