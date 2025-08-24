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

/** 子供クエストステータスエンティティ */
@Entity("quest_member_statuses")
export class QuestMemberStatusEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;
  @Column({ type: "varchar", length: 255, nullable: true, comment: "ステータスの説明" })
  description?: string;

  /** シード用データ取得 */
  protected static seedData(): QuestMemberStatusEntity[] {
    return [
      Object.assign(new QuestMemberStatusEntity(), { id: 1, code: "not_accepted", description: "未受注" }),
      Object.assign(new QuestMemberStatusEntity(), { id: 2, code: "in_progress", description: "進行中" }),
      Object.assign(new QuestMemberStatusEntity(), { id: 3, code: "reporting", description: "報告中" }),
      Object.assign(new QuestMemberStatusEntity(), { id: 4, code: "completed", description: "達成済み" }),
    ];
  }
}

/** 子供クエストステータス翻訳エンティティ */
@Entity("quest_member_statuses_translation")
@Unique("uq_quest_member_statuses_translation_status_language", ["childQuestStatusId", "languageId"])
export class QuestMemberStatusTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ name: "child_quest_status_id", type: "int", nullable: false, comment: "ステータスID(外部キー)" })
  childQuestStatusId!: number;
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
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
    return this.childQuestStatusId;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestMemberStatusTranslationEntity[] {
    return [
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 1, languageId: 1, name: "未受注" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 1, languageId: 2, name: "Not Accepted" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 2, languageId: 1, name: "進行中" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 2, languageId: 2, name: "In Progress" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 3, languageId: 1, name: "報告中" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 3, languageId: 2, name: "Reporting" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 4, languageId: 1, name: "達成済み" }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { childQuestStatusId: 4, languageId: 2, name: "Completed" }),
    ];
  }
}
