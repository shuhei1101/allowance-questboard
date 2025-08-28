import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { ChildEntity } from "../../child/entity/childEntity";
import { QuestMemberStatusEntity } from "./questMemberStatusEntity";
import { FamilyQuestEntity } from "./familyQuestEntity";

/** クエストメンバーエンティティ
 * 家族クエストに参加している子供の情報を管理するエンティティ */
@Entity("quest_members")
@Unique("uq_quest_members", ["familyQuestId", "memberId"])
@Check("chk_quest_members_current_level_positive", "current_level > 0")
@Check("chk_quest_members_achieved_after_published", "(achieved_at IS NULL) OR (achieved_at IS NOT NULL AND achieved_at >= published_at)")
export class QuestMemberEntity extends BaseTransactionEntity {
  @Column({ name: "family_quest_id", type: "int", nullable: false, comment: "家族クエストID" })
  familyQuestId!: number;
  @Column({ name: "member_id", type: "int", nullable: false, comment: "子供ID" })
  memberId!: number;
  @Column({ name: "current_level", type: "int", nullable: false, default: 1, comment: "現在のレベル" })
  currentLevel!: number;
  @Column({ name: "published_at", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "クエスト公開日時" })
  publishedAt!: Date;

  @ManyToOne("FamilyQuestEntity", { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_members_family_quest_id" })
  familyQuest!: FamilyQuestEntity;
  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_members_member_id" })
  member!: ChildEntity;
  @ManyToOne(() => QuestMemberStatusEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_members_status_id" })
  status!: QuestMemberStatusEntity;
}

/** クエストメンバー履歴エンティティ */
@Entity("quest_members_history")
export class QuestMembersHistoryEntity extends BaseHistoryEntity {
  @Column({ name: "family_quest_id", type: "int" })
  familyQuestId?: number;
  @Column({ name: "member_id", type: "int" })
  memberId?: number;
  @Column({ name: "current_level", type: "int" })
  currentLevel?: number;
  @Column({ name: "status_id", type: "int" })
  statusId?: number;
  @Column({ name: "published_at", type: "timestamp" })
  publishedAt?: Date;
  @Column({ name: "achieved_at", type: "timestamp" })
  achievedAt?: Date;

  /** サブクラス固有の属性をセット */
  protected static setSpecificAttrs(instance: QuestMembersHistoryEntity, source: QuestMemberEntity): void {
    instance.familyQuestId = source.familyQuestId;
    instance.memberId = source.memberId;
    instance.currentLevel = source.currentLevel;
    instance.publishedAt = source.publishedAt;
  }
}
