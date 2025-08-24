import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import { BaseMasterTranslationEntity } from "@backend/core/entity/baseTranslationEntity";

/**
 * レポートステータスエンティティ
 */
@Entity("report_statuses")
export class ReportStatusEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "code", type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): ReportStatusEntity[] {
    return [
      Object.assign(new ReportStatusEntity(), { id: 1, code: "pending" }),
      Object.assign(new ReportStatusEntity(), { id: 2, code: "approved" }),
      Object.assign(new ReportStatusEntity(), { id: 3, code: "rejected" }),
      Object.assign(new ReportStatusEntity(), { id: 4, code: "resolved" }),
    ];
  }
}

/**
 * レポートステータス翻訳エンティティ
 */
@Entity("report_statuses_translation")
@Unique("uq_report_statuses_translation_status_language", ["reportStatusId", "languageId"])
export class ReportStatusTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ name: "report_status_id", type: "int", nullable: false, comment: "レポートステータスID" })
  reportStatusId!: number;
  @Column({ name: "status", type: "varchar", length: 50, nullable: false, comment: "翻訳されたステータス名" })
  status!: string;

  @ManyToOne(() => ReportStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "report_status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_report_status_translation_status_id" })
  reportStatus!: ReportStatusEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.reportStatusId;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): ReportStatusTranslationEntity[] {
    return [
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 1, languageId: 1, status: "審査待ち" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 1, languageId: 2, status: "pending" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 2, languageId: 1, status: "承認済み" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 2, languageId: 2, status: "approved" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 3, languageId: 1, status: "却下" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 3, languageId: 2, status: "rejected" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 4, languageId: 1, status: "解決済み" }),
      Object.assign(new ReportStatusTranslationEntity(), { reportStatusId: 4, languageId: 2, status: "resolved" }),
    ];
  }
}
