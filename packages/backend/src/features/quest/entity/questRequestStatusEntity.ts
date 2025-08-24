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

/** クエストリクエストステータスエンティティ */
@Entity("quest_request_statuses")
export class QuestRequestStatusEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "code", type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;
  @Column({ name: "description", type: "varchar", length: 255, nullable: true, comment: "ステータスの説明" })
  description?: string;

  /** シード用データ取得 */
  protected static seedData(): QuestRequestStatusEntity[] {
    return [
      Object.assign(new QuestRequestStatusEntity(), { id: 1, code: "pending", description: "審査待ち" }),
      Object.assign(new QuestRequestStatusEntity(), { id: 2, code: "approved", description: "承認済み" }),
      Object.assign(new QuestRequestStatusEntity(), { id: 3, code: "rejected", description: "却下" }),
    ];
  }
}

/** クエストリクエストステータス翻訳エンティティ */
@Entity("quest_request_statuses_translation")
@Unique("uq_quest_request_statuses_translation_status_language", ["questRequestStatusId", "languageId"])
export class QuestRequestStatusTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ name: "quest_request_status_id", type: "int", nullable: false, comment: "ステータスID" })
  questRequestStatusId!: number;
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @ManyToOne(() => QuestRequestStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_request_status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_request_status_translation_status_id" })
  questRequestStatus!: QuestRequestStatusEntity;

  /** 翻訳元レコードのIDを返す */
  get sourceId(): number {
    return this.questRequestStatusId;
  }

  /** シード用データ取得 */
  protected static seedData(): QuestRequestStatusTranslationEntity[] {
    return [
      Object.assign(new QuestRequestStatusTranslationEntity(), { questRequestStatusId: 1, name: "審査待ち", languageId: 1 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { questRequestStatusId: 1, name: "pending", languageId: 2 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { questRequestStatusId: 2, name: "承認済み", languageId: 1 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { questRequestStatusId: 2, name: "approved", languageId: 2 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { questRequestStatusId: 3, name: "却下", languageId: 1 }),
      Object.assign(new QuestRequestStatusTranslationEntity(), { questRequestStatusId: 3, name: "rejected", languageId: 2 }),
    ];
  }
}
