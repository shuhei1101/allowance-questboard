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
import { QuestTypeEntity } from "./questTypeEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";
import { IconEntity } from "@backend/features/icon/entity/iconEntity";

/**
 * クエストエンティティ
 */
@Entity("quests")
@Check("chk_quests_age_from_non_negative", "age_from >= 0")
@Check("chk_quests_age_to_greater_equal_age_from", "age_to >= age_from")
@Check("chk_quests_month_from_valid", "month_from IS NULL OR (month_from >= 1 AND month_from <= 12)")
@Check("chk_quests_month_to_valid", "month_to IS NULL OR (month_to >= 1 AND month_to <= 12)")
export class QuestEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclass_type!: number;

  @Column({ type: "int", nullable: false, comment: "クエストカテゴリID" })
  category_id!: number;

  @Column({ type: "int", nullable: false, comment: "アイコンID" })
  icon_id!: number;

  @Column({ type: "int", nullable: false, comment: "対象年齢下限" })
  age_from!: number;

  @Column({ type: "int", nullable: false, comment: "対象年齢上限" })
  age_to!: number;

  @Column({ type: "boolean", nullable: false, default: false, comment: "季節限定フラグ" })
  has_published_month!: boolean;

  @Column({ type: "int", nullable: true, comment: "掲載開始月" })
  month_from?: number;

  @Column({ type: "int", nullable: true, comment: "掲載終了月" })
  month_to?: number;

  @ManyToOne(() => QuestTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "subclass_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_quests_subclass_type" })
  subclass_type_ref!: QuestTypeEntity;

  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quests_category_id" })
  category!: QuestCategoryEntity;

  @ManyToOne(() => IconEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quests_icon_id" })
  icon!: IconEntity;

  /**
   * シードデータ
   */
  protected static _seedData(): QuestEntity[] {
    return [
      Object.assign(new QuestEntity(), { subclass_type: 1, category_id: 1, icon_id: 1, age_from: 6, age_to: 12 }),
      Object.assign(new QuestEntity(), { subclass_type: 1, category_id: 2, icon_id: 2, age_from: 3, age_to: 10 }),
      Object.assign(new QuestEntity(), { subclass_type: 1, category_id: 3, icon_id: 3, age_from: 5, age_to: 15 }),
    ];
  }
}

/**
 * クエスト翻訳エンティティ
 */
@Entity("quests_translation")
@Unique("uq_quests_translation_quest_language", ["quest_id", "language_id"])
@Check("chk_quests_translation_title_not_empty", "length(title) > 0")
@Check("chk_quests_translation_client_not_empty", "length(client) > 0")
export class QuestTranslationEntity extends BaseTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;

  @Column({ type: "varchar", length: 200, nullable: false, comment: "クエストタイトルの翻訳" })
  title!: string;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "クライアント名の翻訳" })
  client!: string;

  @Column({ type: "text", nullable: true, comment: "依頼詳細の翻訳" })
  request_detail?: string;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_translation_quest_id" })
  quest!: QuestEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.quest_id;
  }

  /**
   * シードデータ
   */
  protected static _seedData(): QuestTranslationEntity[] {
    return [
      Object.assign(new QuestTranslationEntity(), {
        quest_id: 1,
        language_id: 1,
        title: "クエスト1",
        client: "クライアントA",
        request_detail: "依頼内容A",
      }),
      Object.assign(new QuestTranslationEntity(), {
        quest_id: 2,
        language_id: 1,
        title: "クエスト2",
        client: "クライアントB",
        request_detail: "依頼内容B",
      }),
      Object.assign(new QuestTranslationEntity(), {
        quest_id: 3,
        language_id: 1,
        title: "クエスト3",
        client: "クライアントC",
        request_detail: "依頼内容C",
      }),
    ];
  }
}
