import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { QuestMemberEntity } from "./questMemberEntity";
import { QuestMemberStatusEntity } from "./questMemberStatusEntity";

/** クエスト進捗エンティティ */
@Entity("quest_progresses")
export class QuestProgress extends BaseTransactionEntity {
  @Column({ name: "quest_member_id", type: "int",  comment: "クエストメンバーID" })
  questMemberId!: number;
  @Column({ name: "level", type: "int", nullable: false })
  level!: number;
  @Column({ name: "status_id", type: "int", nullable: false, comment: "クエストステータスID" })
  statusId!: number;
  @Column({ name: "achieved_at", type: "timestamp", nullable: true, comment: "クエスト達成日時" })
  achievedAt?: Date;

  @ManyToOne(() => QuestMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_member_id" })
  questMember!: QuestMemberEntity;
  @ManyToOne(() => QuestMemberStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "status_id" })
  questMemberStatus!: QuestMemberStatusEntity;
}

/** クエスト進捗履歴エンティティ */
@Entity("quest_progresses_history")
export class QuestProgressHistory extends BaseHistoryEntity {
  @Column({ name: "quest_member_id", type: "int"})
  questMemberId?: number;
  @Column({ name: "level", type: "int", })
  level?: number;
  @Column({ name: "status_id", type: "int"})
  statusId?: number;
  @Column({ name: "achieved_at", type: "timestamp"})
  achievedAt?: Date;

  /** サブクラス固有の属性をセット */
  protected setSpecificAttrs(instance: QuestProgressHistory, source: QuestProgress): void {
    instance.questMemberId = source.questMemberId;
    instance.level = source.level;
    instance.statusId = source.statusId;
    instance.achievedAt = source.achievedAt;
  }
}
