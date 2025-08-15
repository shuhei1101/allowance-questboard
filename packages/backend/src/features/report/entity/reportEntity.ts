import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { FamilyMemberEntity } from "src/features/family-member/entity/familyMemberEntity";
import { ReportableTypeEntity } from "./reportableTypeEntity";
import { ReportStatusEntity } from "./reportStatusEntity";

/**
 * レポート(通報)エンティティ
 */
@Entity("reports")
export class ReportEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "レポートしたユーザID" })
  reported_by!: number;
  @Column({ type: "int", nullable: false, comment: "レポート対象タイプID" })
  reportable_type!: number;
  @Column({ type: "int", nullable: false, comment: "ステータスID" })
  status_id!: number;
  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "レポート作成日時" })
  reported_at!: Date;
  @Column({ type: "timestamp", nullable: true, comment: "レポート解決日時" })
  resolved_at?: Date;
  
  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "reported_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_reports_reported_by" })
  reporter!: FamilyMemberEntity;
  @ManyToOne(() => ReportableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "reportable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_reports_reportable_type" })
  reportable_type_ref!: ReportableTypeEntity;
  @ManyToOne(() => ReportStatusEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_reports_status_id" })
  status!: ReportStatusEntity;
}

/**
 * レポート履歴エンティティ
 */
@Entity("reports_history")
export class ReportHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "レポートしたユーザID" })
  reported_by!: number;
  @Column({ type: "int", nullable: false, comment: "レポート対象タイプID" })
  reportable_type!: number;
  @Column({ type: "int", nullable: false, comment: "ステータスID" })
  status_id!: number;
  @Column({ type: "timestamp", nullable: false, comment: "レポート作成日時" })
  reported_at!: Date;
  @Column({ type: "timestamp", nullable: true, comment: "レポート解決日時" })
  resolved_at?: Date;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: ReportHistoryEntity, source: ReportEntity): void {
    instance.reported_by = source.reported_by;
    instance.reportable_type = source.reportable_type;
    instance.status_id = source.status_id;
    instance.reported_at = source.reported_at;
    instance.resolved_at = source.resolved_at;
  }
}
