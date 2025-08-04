import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { ReportEntity } from "./reportEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";
import { ReportStatusEntity } from "./reportStatusEntity";
import { ReportableTypeEntity } from "./reportableTypeEntity";

@Entity("reports_history")
export class ReportHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "int", nullable: false, comment: "レポート対象タイプID" })
  reportable_type_id!: number;

  @Column({ type: "int", nullable: false, comment: "レポート対象ID" })
  reportable_id!: number;

  @Column({ type: "int", nullable: false, comment: "レポートステータスID" })
  report_status_id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "レポートタイトル" })
  title!: string;

  @Column({ type: "text", nullable: false, comment: "レポート内容" })
  content!: string;

  @Column({ type: "text", nullable: true, comment: "証拠画像URL" })
  evidence_image_url?: string;

  @Column({ type: "datetime", nullable: true, comment: "提出日時" })
  submitted_at?: Date;

  @Column({ type: "datetime", nullable: true, comment: "承認日時" })
  approved_at?: Date;

  @Column({ type: "text", nullable: true, comment: "承認者コメント" })
  approval_comment?: string;

  // Relations
  @ManyToOne(() => ReportEntity)
  @JoinColumn({ name: "original_id" })
  report?: ReportEntity;

  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  @ManyToOne(() => ReportableTypeEntity)
  @JoinColumn({ name: "reportable_type_id" })
  reportableType?: ReportableTypeEntity;

  @ManyToOne(() => ReportStatusEntity)
  @JoinColumn({ name: "report_status_id" })
  status?: ReportStatusEntity;

  /**
   * シードデータ
   */
  protected static seedData(): ReportHistoryEntity[] {
    return [
      Object.assign(new ReportHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        reportable_type_id: 1,
        reportable_id: 1,
        report_status_id: 1,
        title: "部屋掃除完了報告",
        content: "部屋をきれいに掃除しました！",
        evidence_image_url: "https://example.com/images/clean-room.jpg",
        submitted_at: new Date("2024-01-01T15:00:00Z"),
        operation_type: "CREATE" as const,
        operation_timestamp: new Date("2024-01-01T15:00:00Z"),
        operated_by: 1,
      }),
      Object.assign(new ReportHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        reportable_type_id: 1,
        reportable_id: 1,
        report_status_id: 2,
        title: "部屋掃除完了報告",
        content: "部屋をきれいに掃除しました！",
        evidence_image_url: "https://example.com/images/clean-room.jpg",
        submitted_at: new Date("2024-01-01T15:00:00Z"),
        approved_at: new Date("2024-01-01T16:00:00Z"),
        approval_comment: "とてもきれいになったね！",
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-01-01T16:00:00Z"),
        operated_by: 2,
      }),
    ];
  }
}
