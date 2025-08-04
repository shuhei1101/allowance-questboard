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
import { IconCategoryEntity } from "./iconCategoryEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("icon_categories_translation")
@Unique("uq_icon_categories_translation_category_language", ["category_id", "language_id"])
export class IconCategoryTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "アイコンカテゴリID" })
  category_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => IconCategoryEntity)
  @JoinColumn({ name: "category_id" })
  category?: IconCategoryEntity;

  /**
   * シードデータ
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
