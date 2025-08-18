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
      Object.assign(new IconCategoryEntity(), { id: 1, sort_order: 1, is_active: true }), // 家事・掃除
      Object.assign(new IconCategoryEntity(), { id: 2, sort_order: 2, is_active: true }), // 勉強・学習
      Object.assign(new IconCategoryEntity(), { id: 3, sort_order: 3, is_active: true }), // スポーツ・運動
      Object.assign(new IconCategoryEntity(), { id: 4, sort_order: 4, is_active: true }), // 料理・食事
      Object.assign(new IconCategoryEntity(), { id: 5, sort_order: 5, is_active: true }), // お買い物・外出
      Object.assign(new IconCategoryEntity(), { id: 6, sort_order: 6, is_active: true }), // ペット・動物
      Object.assign(new IconCategoryEntity(), { id: 7, sort_order: 7, is_active: true }), // 趣味・創作
      Object.assign(new IconCategoryEntity(), { id: 8, sort_order: 8, is_active: true }), // 健康・美容
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
    ];
  }
}

/**
 * アイコンカテゴリ翻訳エンティティのリスト
 */
export class IconCategoryTranslationEntities extends BaseTranslationEntities<IconCategoryTranslationEntity> {}
