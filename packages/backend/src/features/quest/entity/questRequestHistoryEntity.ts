import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { QuestRequestsEntity } from "./questRequestsEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";
import { QuestEntity } from "./questEntity";
import { QuestRequestStatusEntity } from "./questRequestStatusEntity";

@Entity("quest_requests_history")
export class QuestRequestHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;

  @Column({ type: "int", nullable: false, comment: "申請ステータスID" })
  quest_request_status_id!: number;

  @Column({ type: "int", nullable: true, comment: "レベル" })
  level?: number;

  @Column({ type: "text", nullable: true, comment: "申請メッセージ" })
  request_message?: string;

  @Column({ type: "text", nullable: true, comment: "承認者コメント" })
  approval_comment?: string;

  @Column({ type: "datetime", nullable: true, comment: "申請日時" })
  requested_at?: Date;

  @Column({ type: "datetime", nullable: true, comment: "承認日時" })
  approved_at?: Date;

  // Relations
  @ManyToOne(() => QuestRequestsEntity)
  @JoinColumn({ name: "original_id" })
  questRequest?: QuestRequestsEntity;

  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  @ManyToOne(() => QuestEntity)
  @JoinColumn({ name: "quest_id" })
  quest?: QuestEntity;

  @ManyToOne(() => QuestRequestStatusEntity)
  @JoinColumn({ name: "quest_request_status_id" })
  status?: QuestRequestStatusEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestRequestHistoryEntity[] {
    return [
      Object.assign(new QuestRequestHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        quest_id: 1,
        quest_request_status_id: 1,
        level: 1,
        request_message: "部屋の掃除をやりたいです！",
        requested_at: new Date("2024-01-01T10:00:00Z"),
        operation_type: "CREATE" as const,
        operation_timestamp: new Date("2024-01-01T10:00:00Z"),
        operated_by: 1,
      }),
      Object.assign(new QuestRequestHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        quest_id: 1,
        quest_request_status_id: 2,
        level: 1,
        request_message: "部屋の掃除をやりたいです！",
        approval_comment: "頑張って！",
        requested_at: new Date("2024-01-01T10:00:00Z"),
        approved_at: new Date("2024-01-01T11:00:00Z"),
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-01-01T11:00:00Z"),
        operated_by: 2,
      }),
    ];
  }
}
