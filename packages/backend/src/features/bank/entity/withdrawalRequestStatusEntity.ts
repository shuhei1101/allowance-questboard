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
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "ステータスコード" })
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
@Unique("uq_withdrawal_request_statuses_translation_status_language", ["withdrawal_request_status_id", "language_id"])
export class WithdrawalRequestStatusTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "ステータスID" })
  withdrawal_request_status_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "ステータス名の翻訳" })
  name!: string;

  @ManyToOne(() => WithdrawalRequestStatusEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "withdrawal_request_status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_withdrawal_request_status_translation_status_id" })
  withdrawal_request_status!: WithdrawalRequestStatusEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.withdrawal_request_status_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): WithdrawalRequestStatusTranslationEntity[] {
    return [
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 1, language_id: 1, name: "審査中", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 1, language_id: 2, name: "Pending", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 2, language_id: 1, name: "承認済", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 2, language_id: 2, name: "Approved", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 3, language_id: 1, name: "却下", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 3, language_id: 2, name: "Rejected", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 4, language_id: 1, name: "完了", }),
      Object.assign(new WithdrawalRequestStatusTranslationEntity(), { withdrawal_request_status_id: 4, language_id: 2, name: "Completed", }),
    ];
  }
}
