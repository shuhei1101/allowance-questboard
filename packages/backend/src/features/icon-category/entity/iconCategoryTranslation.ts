import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTranslationEntity } from "@backend/core/entity/baseTranslationEntity";
import { IconCategory } from "./iconCategory";

/**
 * アイコンカテゴリ翻訳エンティティ
 */
@Entity("icon_categories_translations")
export class IconCategoryTranslation extends BaseTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "アイコンカテゴリID" })
  icon_category_id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "カテゴリ名" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "説明" })
  description?: string;

  @ManyToOne(() => IconCategory, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "icon_category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icon_category_translations_icon_category_id" })
  icon_category!: IconCategory;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.icon_category_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategoryTranslation[] {
    return [
      Object.assign(new IconCategoryTranslation(), {
        icon_category_id: 1,
        language_id: 1, // 日本語
        name: "動物",
        description: "動物のアイコン"
      }),
      Object.assign(new IconCategoryTranslation(), {
        icon_category_id: 1,
        language_id: 2, // 英語
        name: "Animals",
        description: "Animal icons"
      }),
      Object.assign(new IconCategoryTranslation(), {
        icon_category_id: 2,
        language_id: 1, // 日本語
        name: "食べ物",
        description: "食べ物のアイコン"
      }),
      Object.assign(new IconCategoryTranslation(), {
        icon_category_id: 2,
        language_id: 2, // 英語
        name: "Food",
        description: "Food icons"
      }),
    ];
  }
}
