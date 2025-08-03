import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseTranslationEntity } from "@backend/core/entity/baseTranslationEntity";

/**
 * アイコンカテゴリエンティティ
 */
@Entity("icon_categories")
export class IconCategory extends AppBaseEntity {
  @Column({ type: "int", nullable: false, default: 0, comment: "表示順序" })
  sort_order!: number;

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategory[] {
    return [
      Object.assign(new IconCategory(), {
        sort_order: 1,
        is_active: true
      }),
      Object.assign(new IconCategory(), {
        sort_order: 2,
        is_active: true
      }),
      Object.assign(new IconCategory(), {
        sort_order: 3,
        is_active: true
      }),
    ];
  }
}

/**
 * アイコンカテゴリ翻訳エンティティ
 */
@Entity("icon_categories_translation")
@Unique("uq_icon_categories_translation_category_language", ["category_id", "language_id"])
export class IconCategoryTranslation extends BaseTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "アイコンカテゴリID" })
  category_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  @ManyToOne(() => IconCategory, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icon_category_translations_category_id" })
  category!: IconCategory;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.category_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategoryTranslation[] {
    return [
      Object.assign(new IconCategoryTranslation(), {
        category_id: 1,
        language_id: 1, // 日本語
        name: "アクション"
      }),
      Object.assign(new IconCategoryTranslation(), {
        category_id: 1,
        language_id: 2, // 英語
        name: "Action"
      }),
      Object.assign(new IconCategoryTranslation(), {
        category_id: 2,
        language_id: 1, // 日本語
        name: "ナビゲーション"
      }),
      Object.assign(new IconCategoryTranslation(), {
        category_id: 2,
        language_id: 2, // 英語
        name: "Navigation"
      }),
      Object.assign(new IconCategoryTranslation(), {
        category_id: 3,
        language_id: 1, // 日本語
        name: "コミュニケーション"
      }),
      Object.assign(new IconCategoryTranslation(), {
        category_id: 3,
        language_id: 2, // 英語
        name: "Communication"
      }),
    ];
  }
}
