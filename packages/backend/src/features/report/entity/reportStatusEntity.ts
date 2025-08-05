import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseTranslationEntity } from "@backend/core/entity/baseTranslationEntity";

/**
 * レポートステータスエンティティ
 */
@Entity("report_statuses")
export class ReportStatusEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): ReportStatusEntity[] {
    return [
      Object.assign(new ReportStatusEntity(), { code: "pending" }),
      Object.assign(new ReportStatusEntity(), { code: "approved" }),
      Object.assign(new ReportStatusEntity(), { code: "rejected" }),
      Object.assign(new ReportStatusEntity(), { code: "resolved" }),
    ];
  }
}

/**
 * レポートステータス翻訳エンティティ
 */
@Entity("report_statuses_translation")
@Unique("uq_report_statuses_translation_status_language", ["report_status_id", "language_id"])
export class ReportStatusTranslationEntity extends BaseTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "レポートステータスID" })
  report_status_id!: number;
  @Column({ type: "varchar", length: 50, nullable: false, comment: "翻訳されたステータス名" })
  status!: string;

  @ManyToOne(() => ReportStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "report_status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_report_status_translation_status_id" })
  report_status!: ReportStatusEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.report_status_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): ReportStatusTranslationEntity[] {
    return [
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 1, language_id: 1, status: "審査待ち" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 1, language_id: 2, status: "pending" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 2, language_id: 1, status: "承認済み" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 2, language_id: 2, status: "approved" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 3, language_id: 1, status: "却下" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 3, language_id: 2, status: "rejected" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 4, language_id: 1, status: "解決済み" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 4, language_id: 2, status: "resolved" }),
    ];
  }
}
