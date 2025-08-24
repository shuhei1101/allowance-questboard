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
import { BaseTranslationEntities } from "@backend/core/entity/baseTranslationEntities";

/**
 * アイコンカテゴリエンティティ
 */
@Entity("icon_categories")
export class IconCategoryEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "sort_order", type: "int", default: 0, comment: "表示順序" })
  sortOrder!: number;
  @Column({ name: "is_active", type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  isActive!: boolean;

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategoryEntity[] {
    return [
      Object.assign(new IconCategoryEntity(), { id: 1, sortOrder: 1, isActive: true }), // 家事・掃除
      Object.assign(new IconCategoryEntity(), { id: 2, sortOrder: 2, isActive: true }), // 勉強・学習
      Object.assign(new IconCategoryEntity(), { id: 3, sortOrder: 3, isActive: true }), // スポーツ・運動
      Object.assign(new IconCategoryEntity(), { id: 4, sortOrder: 4, isActive: true }), // 料理・食事
      Object.assign(new IconCategoryEntity(), { id: 5, sortOrder: 5, isActive: true }), // お買い物・外出
      Object.assign(new IconCategoryEntity(), { id: 6, sortOrder: 6, isActive: true }), // ペット・動物
      Object.assign(new IconCategoryEntity(), { id: 7, sortOrder: 7, isActive: true }), // 趣味・創作
      Object.assign(new IconCategoryEntity(), { id: 8, sortOrder: 8, isActive: true }), // 健康・美容
    ];
  }
}

/**
 * アイコンカテゴリ翻訳エンティティ
 */
@Entity("icon_categories_translation")
@Unique("uq_icon_categories_translation_category_language", ["categoryId", "languageId"])
export class IconCategoryTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ name: "category_id", type: "int", nullable: false, comment: "アイコンカテゴリID" })
  categoryId!: number;
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "カテゴリ名の翻訳" })
  name!: string;

  @ManyToOne(() => IconCategoryEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icon_category_id" })
  category!: IconCategoryEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.categoryId;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): IconCategoryTranslationEntity[] {
    return [
      // 日本語翻訳
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 1, languageId: 1, name: "家事・掃除" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 2, languageId: 1, name: "勉強・学習" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 3, languageId: 1, name: "スポーツ・運動" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 4, languageId: 1, name: "料理・食事" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 5, languageId: 1, name: "お買い物・外出" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 6, languageId: 1, name: "ペット・動物" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 7, languageId: 1, name: "趣味・創作" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 8, languageId: 1, name: "健康・美容" }),
      
      // 英語翻訳
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 1, languageId: 2, name: "Housework & Cleaning" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 2, languageId: 2, name: "Study & Learning" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 3, languageId: 2, name: "Sports & Exercise" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 4, languageId: 2, name: "Cooking & Dining" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 5, languageId: 2, name: "Shopping & Outings" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 6, languageId: 2, name: "Pets & Animals" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 7, languageId: 2, name: "Hobbies & Creativity" }),
      Object.assign(new IconCategoryTranslationEntity(), { categoryId: 8, languageId: 2, name: "Health & Beauty" }),
    ];
  }
}

/**
 * アイコンカテゴリ翻訳エンティティのリスト
 */
export class IconCategoryTranslationEntities extends BaseTranslationEntities<IconCategoryTranslationEntity> {}
