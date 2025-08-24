import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
  PrimaryColumn,
} from "typeorm";
import { QuestTypeEntity } from "./questTypeEntity";
import { QuestCategoryEntity } from "./questCategoryEntity";
import { IconEntity } from "@backend/features/icon/entity/iconEntity";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseTransactionTranslationEntity } from "@backend/core/entity/baseTranslationEntity";

/** クエストエンティティ */
@Entity("quests")
@Check("chk_quests_age_from_non_negative", "age_from >= 0")
@Check("chk_quests_age_to_greater_equal_age_from", "age_to >= age_from")
@Check("chk_quests_month_from_valid", "month_from IS NULL OR (month_from >= 1 AND month_from <= 12)")
@Check("chk_quests_month_to_valid", "month_to IS NULL OR (month_to >= 1 AND month_to <= 12)")
export class QuestEntity extends BaseTransactionEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "subclass_type", type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclassType!: number;
  @Column({ name: "category_id", type: "int", nullable: false, comment: "クエストカテゴリID" })
  categoryId!: number;
  @Column({ name: "icon_id", type: "int", nullable: false, comment: "アイコンID" })
  iconId!: number;
  @Column({ name: "age_from", type: "int", nullable: false, comment: "対象年齢下限" })
  ageFrom!: number;
  @Column({ name: "age_to", type: "int", nullable: false, comment: "対象年齢上限" })
  ageTo!: number;
  @Column({ name: "has_published_month", type: "boolean", nullable: false, default: false, comment: "季節限定フラグ" })
  hasPublishedMonth!: boolean;
  @Column({ name: "month_from", type: "int", nullable: true, comment: "掲載開始月" })
  monthFrom?: number;
  @Column({ name: "month_to", type: "int", nullable: true, comment: "掲載終了月" })
  monthTo?: number;

  @ManyToOne(() => QuestTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "subclass_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_quests_subclass_type" })
  subclassTypeRef!: QuestTypeEntity;
  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quests_category_id" })
  category!: QuestCategoryEntity;
  @ManyToOne(() => IconEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quests_icon_id" })
  icon!: IconEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestEntity[] {
    return [
      Object.assign(new QuestEntity(), { id: 1, subclassType: 1, categoryId: 1, iconId: 1, ageFrom: 6, ageTo: 12 }),
      Object.assign(new QuestEntity(), { id: 2, subclassType: 1, categoryId: 2, iconId: 2, ageFrom: 3, ageTo: 10 }),
      Object.assign(new QuestEntity(), { id: 3, subclassType: 1, categoryId: 3, iconId: 3, ageFrom: 5, ageTo: 15 }),
    ];
  }
}

/** クエスト翻訳エンティティ */
@Entity("quests_translation")
@Unique("uq_quests_translation_quest_language", ["questId", "languageId"])
@Check("chk_quests_translation_title_not_empty", "length(title) > 0")
@Check("chk_quests_translation_client_not_empty", "length(client) > 0")
export class QuestTranslationEntity extends BaseTransactionTranslationEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "quest_id", type: "int", nullable: false, comment: "クエストID" })
  questId!: number;
  @Column({ name: "title", type: "varchar", length: 200, nullable: false, comment: "クエストタイトルの翻訳" })
  title!: string;
  @Column({ name: "client", type: "varchar", length: 100, nullable: false, comment: "クライアント名の翻訳" })
  client!: string;
  @Column({ name: "request_detail", type: "text", nullable: true, comment: "依頼詳細の翻訳" })
  requestDetail?: string;
  @Column({ name: "category_id", type: "int", nullable: false, comment: "クエストカテゴリID" })
  categoryId!: number;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_translation_quest_id" })
  quest!: QuestEntity;
  @ManyToOne(() => QuestCategoryEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_translation_category_id" })
  category!: QuestCategoryEntity;

  /** 翻訳元レコードのIDを返す */
  get sourceId(): number {
    return this.questId;
  }

  /**
   * シードデータ
   */
  protected static seedData(): QuestTranslationEntity[] {
    return [
      Object.assign(new QuestTranslationEntity(), { questId: 1, languageId: 1, title: "クエスト1", client: "クライアントA", requestDetail: "依頼内容A", categoryId: 1 }),
      Object.assign(new QuestTranslationEntity(), { questId: 2, languageId: 1, title: "クエスト2", client: "クライアントB", requestDetail: "依頼内容B", categoryId: 2 }),
      Object.assign(new QuestTranslationEntity(), { questId: 3, languageId: 1, title: "クエスト3", client: "クライアントC", requestDetail: "依頼内容C", categoryId: 3 }),
    ];
  }
}
