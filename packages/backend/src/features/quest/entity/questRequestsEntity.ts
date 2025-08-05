import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { ChildEntity } from "../../child/entity/childEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";
import { QuestEntity } from "./questEntity";
import { QuestRequestStatusEntity } from "./questRequestStatusEntity";

/**
 * クエストリクエストエンティティ
 */
@Entity("quest_requests")
@Check("chk_quest_requests_title_not_empty", "length(title) > 0")
@Check("chk_quest_requests_description_not_empty", "length(description) > 0")
export class QuestRequestsEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "リクエスト者の子供ID" })
  requested_by!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  approved_by!: number;
  @Column({ type: "int", nullable: true, comment: "既存クエストID" })
  quest_id!: number | null;
  @Column({ type: "varchar", length: 200, nullable: false, comment: "リクエストタイトル" })
  title!: string;
  @Column({ type: "text", nullable: false, comment: "リクエスト説明" })
  description!: string;
  @Column({ type: "boolean", nullable: false, default: true, comment: "新規クエストリクエストフラグ" })
  is_new_request!: boolean;
  @Column({ type: "int", nullable: false, comment: "ステータスID" })
  status_id!: number;
  @Column({ type: "text", nullable: true, comment: "回答内容" })
  answer!: string | null;
  @Column({ type: "timestamp", nullable: true, comment: "回答日時" })
  answered_at!: Date | null;
  @Column({ type: "timestamp", nullable: true, comment: "リクエスト日時" })
  requested_at!: Date | null;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "approved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_approved_by" })
  family!: FamilyEntity;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "requested_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_requested_by" })
  child!: ChildEntity;
  @ManyToOne(() => QuestEntity, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_quest_id" })
  quest!: QuestEntity | null;
  @ManyToOne(() => QuestRequestStatusEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_requests_status_id" })
  status!: QuestRequestStatusEntity;
}

/**
 * クエストリクエスト履歴エンティティ
 */
@Entity("quest_requests_history")
export class QuestRequestsHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int" })
  requested_by!: number;
  @Column({ type: "int" })
  approved_by!: number;
  @Column({ type: "int" })
  quest_id!: number | null;
  @Column({ type: "varchar", length: 200 })
  title!: string;
  @Column({ type: "text" })
  description!: string;
  @Column({ type: "boolean" })
  is_new_request!: boolean;
  @Column({ type: "int" })
  status_id!: number;
  @Column({ type: "text" })
  answer!: string | null;
  @Column({ type: "timestamp" })
  answered_at!: Date | null;
  @Column({ type: "timestamp" })
  requested_at!: Date | null;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: QuestRequestsHistoryEntity, source: QuestRequestsEntity): void {
    instance.requested_by = source.requested_by;
    instance.approved_by = source.approved_by;
    instance.quest_id = source.quest_id;
    instance.title = source.title;
    instance.description = source.description;
    instance.is_new_request = source.is_new_request;
    instance.status_id = source.status_id;
    instance.answer = source.answer;
    instance.answered_at = source.answered_at;
    instance.requested_at = source.requested_at;
  }
}
