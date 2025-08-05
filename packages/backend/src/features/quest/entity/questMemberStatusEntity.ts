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
 * 子供クエストステータスエンティティ
 */
@Entity("quest_member_statuses")
export class QuestMemberStatusEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;
  @Column({ type: "varchar", length: 255, nullable: true, comment: "ステータスの説明" })
  description?: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestMemberStatusEntity[] {
    return [
      Object.assign(new QuestMemberStatusEntity(), { code: "not_accepted", description: "未受注" }),
      Object.assign(new QuestMemberStatusEntity(), { code: "in_progress", description: "進行中" }),
      Object.assign(new QuestMemberStatusEntity(), { code: "reporting", description: "報告中" }),
      Object.assign(new QuestMemberStatusEntity(), { code: "completed", description: "達成済み" }),
    ];
  }
}

/**
 * 子供クエストステータス翻訳エンティティ
 */
@Entity("quest_member_statuses_translation")
@Unique("uq_quest_member_statuses_translation_status_language", ["child_quest_status_id", "language_id"])
export class MemberQuestStatusTranslationEntity extends BaseTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "ステータスID(外部キー)" })
  child_quest_status_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @ManyToOne(() => QuestMemberStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ 
    name: "child_quest_status_id", 
    referencedColumnName: "id", 
    foreignKeyConstraintName: "fk_member_quest_status_translation_status_id" 
  })
  child_quest_status!: QuestMemberStatusEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.child_quest_status_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): MemberQuestStatusTranslationEntity[] {
    return [
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 1, language_id: 1, name: "未受注" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 1, language_id: 2, name: "Not Accepted" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 2, language_id: 1, name: "進行中" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 2, language_id: 2, name: "In Progress" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 3, language_id: 1, name: "報告中" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 3, language_id: 2, name: "Reporting" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 4, language_id: 1, name: "達成済み" }),
      Object.assign(new MemberQuestStatusTranslationEntity(), { child_quest_status_id: 4, language_id: 2, name: "Completed" }),
    ];
  }
}
