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

/**
 * クエストメンバーエンティティ
 * 
 * 家族クエストに参加している子供の情報を管理するエンティティです。
 */
@Entity("quest_members")
@Unique("uq_quest_members", ["family_quest_id", "member_id"])
@Check("chk_quest_members_current_level_positive", "current_level > 0")
@Check("chk_quest_members_achieved_after_published", "(achieved_at IS NULL) OR (achieved_at IS NOT NULL AND achieved_at >= published_at)")
export class QuestMembersEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "家族クエストID" })
  family_quest_id!: number;
  @Column({ type: "int", nullable: false, comment: "子供ID" })
  member_id!: number;
  @Column({ type: "int", nullable: false, default: 1, comment: "現在のレベル" })
  current_level!: number;
  @Column({ type: "int", nullable: false, comment: "クエストステータスID" })
  status_id!: number;
  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "クエスト公開日時" })
  published_at!: Date;
  @Column({ type: "timestamp", nullable: true, comment: "クエスト達成日時" })
  achieved_at!: Date | null;

  @ManyToOne("FamilyQuestEntity", { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_members_family_quest_id" })
  family_quest!: any;
  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_members_member_id" })
  member!: ChildEntity;
  @ManyToOne(() => QuestMemberStatusEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_members_status_id" })
  status!: QuestMemberStatusEntity;
}

/**
 * クエストメンバー履歴エンティティ
 */
@Entity("quest_members_history")
export class QuestMembersHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int" })
  family_quest_id!: number;
  @Column({ type: "int" })
  member_id!: number;
  @Column({ type: "int" })
  current_level!: number;
  @Column({ type: "int" })
  status_id!: number;
  @Column({ type: "timestamp" })
  published_at!: Date;
  @Column({ type: "timestamp" })
  achieved_at!: Date | null;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: QuestMembersHistoryEntity, source: QuestMembersEntity): void {
    instance.family_quest_id = source.family_quest_id;
    instance.member_id = source.member_id;
    instance.current_level = source.current_level;
    instance.status_id = source.status_id;
    instance.published_at = source.published_at;
    instance.achieved_at = source.achieved_at;
  }
}
