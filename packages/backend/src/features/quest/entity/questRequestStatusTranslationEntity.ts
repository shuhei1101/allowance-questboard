import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestRequestStatusEntity } from "./questRequestStatusEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("quest_request_statuses_translation")
@Unique("uq_quest_request_statuses_translation_status_language", ["quest_request_status_id", "language_id"])
export class QuestRequestStatusTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエスト申請ステータスID" })
  quest_request_status_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "ステータス説明の翻訳" })
  description?: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => QuestRequestStatusEntity)
  @JoinColumn({ name: "quest_request_status_id" })
  questRequestStatus?: QuestRequestStatusEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestRequestStatusTranslationEntity[] {
    return [
      Object.assign(new QuestRequestStatusTranslationEntity(), { 
        quest_request_status_id: 1, 
        language_id: 1, 
        name: "申請中", 
        description: "クエスト申請が提出された状態" 
      }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { 
        quest_request_status_id: 1, 
        language_id: 2, 
        name: "Pending", 
        description: "Quest request has been submitted" 
      }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { 
        quest_request_status_id: 2, 
        language_id: 1, 
        name: "承認済み", 
        description: "クエスト申請が承認された状態" 
      }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { 
        quest_request_status_id: 2, 
        language_id: 2, 
        name: "Approved", 
        description: "Quest request has been approved" 
      }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { 
        quest_request_status_id: 3, 
        language_id: 1, 
        name: "拒否", 
        description: "クエスト申請が拒否された状態" 
      }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { 
        quest_request_status_id: 3, 
        language_id: 2, 
        name: "Rejected", 
        description: "Quest request has been rejected" 
      }),
    ];
  }
}
