import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestMemberStatusEntity } from "./questMemberStatusEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("quest_member_statuses_translation")
@Unique("uq_quest_member_statuses_translation_status_language", ["quest_member_status_id", "language_id"])
export class QuestMemberStatusTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエストメンバーステータスID" })
  quest_member_status_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "ステータス説明の翻訳" })
  description?: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => QuestMemberStatusEntity)
  @JoinColumn({ name: "quest_member_status_id" })
  questMemberStatus?: QuestMemberStatusEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestMemberStatusTranslationEntity[] {
    return [
      Object.assign(new QuestMemberStatusTranslationEntity(), { 
        quest_member_status_id: 1, 
        language_id: 1, 
        name: "未開始", 
        description: "クエストがまだ開始されていない状態" 
      }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { 
        quest_member_status_id: 1, 
        language_id: 2, 
        name: "Not Started", 
        description: "Quest has not been started yet" 
      }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { 
        quest_member_status_id: 2, 
        language_id: 1, 
        name: "進行中", 
        description: "クエストが進行中の状態" 
      }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { 
        quest_member_status_id: 2, 
        language_id: 2, 
        name: "In Progress", 
        description: "Quest is currently in progress" 
      }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { 
        quest_member_status_id: 3, 
        language_id: 1, 
        name: "完了", 
        description: "クエストが完了した状態" 
      }),
      Object.assign(new QuestMemberStatusTranslationEntity(), { 
        quest_member_status_id: 3, 
        language_id: 2, 
        name: "Completed", 
        description: "Quest has been completed" 
      }),
    ];
  }
}
