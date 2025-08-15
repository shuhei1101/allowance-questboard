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

/**
 * クエストリクエストステータスエンティティ
 */
@Entity("quest_request_statuses")
export class QuestRequestStatusEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;
  @Column({ type: "varchar", length: 255, nullable: true, comment: "ステータスの説明" })
  description?: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestRequestStatusEntity[] {
    return [
      Object.assign(new QuestRequestStatusEntity(), { id: 1, code: "pending", description: "審査待ち" }),
      Object.assign(new QuestRequestStatusEntity(), { id: 2, code: "approved", description: "承認済み" }),
      Object.assign(new QuestRequestStatusEntity(), { id: 3, code: "rejected", description: "却下" }),
    ];
  }
}

/**
 * クエストリクエストステータス翻訳エンティティ
 */
@Entity("quest_request_statuses_translation")
@Unique("uq_quest_request_statuses_translation_status_language", ["quest_request_status_id", "language_id"])
export class QuestRequestStatusTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "ステータスID" })
  quest_request_status_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @ManyToOne(() => QuestRequestStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ 
    name: "quest_request_status_id", 
    referencedColumnName: "id", 
    foreignKeyConstraintName: "fk_quest_request_status_translation_status_id" 
  })
  quest_request_status!: QuestRequestStatusEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.quest_request_status_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestRequestStatusTranslationEntity[] {
    return [
      Object.assign(new QuestRequestStatusTranslationEntity(), { quest_request_status_id: 1, name: "審査待ち", language_id: 1 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { quest_request_status_id: 1, name: "pending", language_id: 2 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { quest_request_status_id: 2, name: "承認済み", language_id: 1 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { quest_request_status_id: 2, name: "approved", language_id: 2 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { quest_request_status_id: 3, name: "却下", language_id: 1 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { quest_request_status_id: 3, name: "rejected", language_id: 2 }),
    ];
  }
}
