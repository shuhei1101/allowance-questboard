import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { ReportableTypeEntity } from "./reportableTypeEntity";
import { ReportStatusEntity } from "./reportStatusEntity";

/**
 * レポート(通報)エンティティ
 */
@Entity("reports")
export class ReportEntity extends BaseTransactionEntity {
  @Column({ name: "reported_by", type: "int", nullable: false, comment: "レポートしたユーザID" })
  reportedBy!: number;
  @Column({ name: "reportable_type", type: "int", nullable: false, comment: "レポート対象タイプID" })
  reportableType!: number;
  @Column({ name: "status_id", type: "int", nullable: false, comment: "ステータスID" })
  statusId!: number;
  @Column({ name: "reported_at", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "レポート作成日時" })
  reportedAt!: Date;
  @Column({ name: "resolved_at", type: "timestamp", nullable: true, comment: "レポート解決日時" })
  resolvedAt?: Date;
  
  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "reported_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_reports_reported_by" })
  reporter!: FamilyMemberEntity;
  @ManyToOne(() => ReportableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "reportable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_reports_reportable_type" })
  reportableTypeRef!: ReportableTypeEntity;
  @ManyToOne(() => ReportStatusEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_reports_status_id" })
  status!: ReportStatusEntity;
}

/**
 * レポート履歴エンティティ
 */
@Entity("reports_history")
export class ReportHistoryEntity extends BaseHistoryEntity {
  @Column({ name: "reported_by", type: "int", nullable: false, comment: "レポートしたユーザID" })
  reportedBy!: number;
  @Column({ name: "reportable_type", type: "int", nullable: false, comment: "レポート対象タイプID" })
  reportableType!: number;
  @Column({ name: "status_id", type: "int", nullable: false, comment: "ステータスID" })
  statusId!: number;
  @Column({ name: "reported_at", type: "timestamp", nullable: false, comment: "レポート作成日時" })
  reportedAt!: Date;
  @Column({ name: "resolved_at", type: "timestamp", nullable: true, comment: "レポート解決日時" })
  resolvedAt?: Date;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: ReportHistoryEntity, source: ReportEntity): void {
    instance.reportedBy = source.reportedBy;
    instance.reportableType = source.reportableType;
    instance.statusId = source.statusId;
    instance.reportedAt = source.reportedAt;
    instance.resolvedAt = source.resolvedAt;
  }
}
