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
 * 引き落とし申請ステータスエンティティ
 */
@Entity("withdrawal_request_statuses")
export class WithdrawalRequestStatusEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "code", type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
  code!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): WithdrawalRequestStatusEntity[] {
    return [
      Object.assign(new WithdrawalRequestStatusEntity(), { id: 1, code: "pending" }),
      Object.assign(new WithdrawalRequestStatusEntity(), { id: 2, code: "approved" }),
      Object.assign(new WithdrawalRequestStatusEntity(), { id: 3, code: "rejected" }),
      Object.assign(new WithdrawalRequestStatusEntity(), { id: 4, code: "completed" }),
    ];
  }
}

/**
 * 引き落とし申請ステータス翻訳エンティティ
 */
@Entity("withdrawal_request_statuses_translation")
@Unique("uq_withdrawal_request_statuses_translation_status_language", ["withdrawalRequestStatusId", "languageId"])
export class WithdrawalRequestStatusTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ name: "withdrawal_request_status_id", type: "int", nullable: false, comment: "ステータスID" })
  withdrawalRequestStatusId!: number;
  @Column({ name: "language_id", type: "int", nullable: false, comment: "言語ID" })
  languageId!: number;
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @ManyToOne(() => WithdrawalRequestStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "withdrawal_request_status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_withdrawal_request_status_translation_status_id" })
  withdrawalRequestStatus!: WithdrawalRequestStatusEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.withdrawalRequestStatusId;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): WithdrawalRequestStatusTranslationEntity[] {
    return [
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 1, languageId: 1, name: "審査中", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 1, languageId: 2, name: "Pending", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 2, languageId: 1, name: "承認済", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 2, languageId: 2, name: "Approved", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 3, languageId: 1, name: "却下", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 3, languageId: 2, name: "Rejected", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 4, languageId: 1, name: "完了", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawalRequestStatusId: 4, languageId: 2, name: "Completed", }),
    ];
  }
}
