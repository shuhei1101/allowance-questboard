import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { ChildEntity } from "../../child/entity/childEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";
import { QuestEntity } from "./questEntity";
import { QuestRequestStatusEntity } from "./questRequestStatusEntity";

/** クエストリクエストエンティティ */
@Entity("quest_requests")
@Check("chk_quest_requests_title_not_empty", "length(title) > 0")
@Check("chk_quest_requests_description_not_empty", "length(description) > 0")
export class QuestRequestEntity extends BaseTransactionEntity {
  @Column({ name: "requested_by", type: "int", nullable: false, comment: "リクエスト者の子供ID" })
  requestedBy!: number;
  @Column({ name: "approved_by", type: "int", nullable: false, comment: "家族ID" })
  approvedBy!: number;
  @Column({ name: "quest_id", type: "int", nullable: true, comment: "既存クエストID" })
  questId?: number;
  @Column({ name: "title", type: "varchar", length: 200, nullable: false, comment: "リクエストタイトル" })
  title!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "リクエスト説明" })
  description!: string;
  @Column({ name: "is_new_request", type: "boolean", nullable: false, default: true, comment: "新規クエストリクエストフラグ" })
  isNewRequest!: boolean;
  @Column({ name: "status_id", type: "int", nullable: false, comment: "ステータスID" })
  statusId!: number;
  @Column({ name: "answer", type: "text", nullable: true, comment: "回答内容" })
  answer?: string;
  @Column({ name: "answered_at", type: "timestamp", nullable: true, comment: "回答日時" })
  answeredAt?: Date;
  @Column({ name: "requested_at", type: "timestamp", nullable: true, comment: "リクエスト日時" })
  requestedAt?: Date;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "approved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_approved_by" })
  family!: FamilyEntity;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "requested_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_requested_by" })
  child!: ChildEntity;
  @ManyToOne(() => QuestEntity, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_quest_id" })
  quest?: QuestEntity;
  @ManyToOne(() => QuestRequestStatusEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_status_id" })
  status!: QuestRequestStatusEntity;
}

/** クエストリクエスト履歴エンティティ */
@Entity("quest_requests_history")
export class QuestRequestsHistoryEntity extends BaseHistoryEntity {
  @Column({ name: "requested_by", type: "int" })
  requestedBy!: number;
  @Column({ name: "approved_by", type: "int" })
  approvedBy!: number;
  @Column({ name: "quest_id", type: "int" })
  questId?: number;
  @Column({ name: "title", type: "varchar", length: 200 })
  title!: string;
  @Column({ name: "description", type: "text" })
  description!: string;
  @Column({ name: "is_new_request", type: "boolean" })
  isNewRequest!: boolean;
  @Column({ name: "status_id", type: "int" })
  statusId!: number;
  @Column({ name: "answer", type: "text" })
  answer?: string;
  @Column({ name: "answered_at", type: "timestamp" })
  answeredAt?: Date;
  @Column({ name: "requested_at", type: "timestamp" })
  requestedAt?: Date;

  /** サブクラス固有の属性をセット */
  protected static setSpecificAttrs(instance: QuestRequestsHistoryEntity, source: QuestRequestEntity): void {
    instance.requestedBy = source.requestedBy;
    instance.approvedBy = source.approvedBy;
    instance.questId = source.questId;
    instance.title = source.title;
    instance.description = source.description;
    instance.isNewRequest = source.isNewRequest;
    instance.statusId = source.statusId;
    instance.answer = source.answer;
    instance.answeredAt = source.answeredAt;
    instance.requestedAt = source.requestedAt;
  }
}
