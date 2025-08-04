import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DataSource,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { ReportStatusEntity } from "./reportStatusEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("report_statuses_translation")
@Unique("uq_report_statuses_translation_status_language", ["report_status_id", "language_id"])
export class ReportStatusTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "レポートステータスID" })
  report_status_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "ステータス説明の翻訳" })
  description?: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => ReportStatusEntity)
  @JoinColumn({ name: "report_status_id" })
  reportStatus?: ReportStatusEntity;

  /**
   * シードデータ
   */
  protected static seedData(): ReportStatusTranslationEntity[] {
    return [
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 1, language_id: 1, name: "提出", description: "レポートが提出された状態" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 1, language_id: 2, name: "Submitted", description: "Report has been submitted" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 2, language_id: 1, name: "承認", description: "レポートが承認された状態" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 2, language_id: 2, name: "Approved", description: "Report has been approved" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 3, language_id: 1, name: "差し戻し", description: "レポートが差し戻された状態" }),
      Object.assign(new ReportStatusTranslationEntity(), { report_status_id: 3, language_id: 2, name: "Rejected", description: "Report has been rejected" }),
    ];
  }
}
