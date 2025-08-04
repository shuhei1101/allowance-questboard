import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { QuestMembersEntity } from "./questMembersEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";
import { QuestEntity } from "./questEntity";
import { QuestMemberStatusEntity } from "./questMemberStatusEntity";

@Entity("quest_members_history")
export class QuestMemberHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;

  @Column({ type: "int", nullable: false, comment: "ステータスID" })
  quest_member_status_id!: number;

  @Column({ type: "int", nullable: true, comment: "レベル" })
  level?: number;

  @Column({ type: "int", nullable: true, default: 0, comment: "進捗率" })
  progress_percentage?: number;

  @Column({ type: "datetime", nullable: true, comment: "開始日時" })
  started_at?: Date;

  @Column({ type: "datetime", nullable: true, comment: "完了日時" })
  completed_at?: Date;

  @Column({ type: "text", nullable: true, comment: "メモ" })
  notes?: string;

  // Relations
  @ManyToOne(() => QuestMembersEntity)
  @JoinColumn({ name: "original_id" })
  questMember?: QuestMembersEntity;

  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  @ManyToOne(() => QuestEntity)
  @JoinColumn({ name: "quest_id" })
  quest?: QuestEntity;

  @ManyToOne(() => QuestMemberStatusEntity)
  @JoinColumn({ name: "quest_member_status_id" })
  status?: QuestMemberStatusEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestMemberHistoryEntity[] {
    return [
      Object.assign(new QuestMemberHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        quest_id: 1,
        quest_member_status_id: 1,
        level: 1,
        progress_percentage: 0,
        notes: "クエスト開始準備中",
        operation_type: "CREATE" as const,
        operation_timestamp: new Date("2024-01-01T10:00:00Z"),
        operated_by: 1,
      }),
      Object.assign(new QuestMemberHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        quest_id: 1,
        quest_member_status_id: 2,
        level: 1,
        progress_percentage: 50,
        started_at: new Date("2024-01-01T11:00:00Z"),
        notes: "クエスト開始！頑張ろう",
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-01-01T11:00:00Z"),
        operated_by: 1,
      }),
    ];
  }
}
