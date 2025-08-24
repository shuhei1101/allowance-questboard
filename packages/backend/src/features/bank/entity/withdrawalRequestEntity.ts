import { Entity, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";
import { WithdrawalRequestStatusEntity } from "./withdrawalRequestStatusEntity";

/**
 * 引き落とし申請エンティティ
 */
@Entity("withdrawal_requests")
@Check("chk_withdrawal_requests_amount_positive", "amount > 0")
export class WithdrawalRequestEntity extends BaseTransactionEntity {
  @Column({ name: "requested_by", type: "int", nullable: false, comment: "申請者の子供ID" })
  requestedBy!: number;
  @Column({ name: "approved_by", type: "int", nullable: false, comment: "承認者の家族ID" })
  approvedBy!: number;
  @Column({ name: "status_id", type: "int", nullable: false, comment: "申請ステータスID" })
  statusId!: number;
  @Column({ name: "amount", type: "int", nullable: false, comment: "引き落とし金額" })
  amount!: number;
  @Column({ name: "reason", type: "varchar", length: 500, nullable: false, comment: "引き落とし理由" })
  reason!: string;
  @Column({ name: "requested_at", type: "timestamp", nullable: false, comment: "申請日時" })
  requestedAt!: Date;
  @Column({ name: "approved_at", type: "timestamp", nullable: true, comment: "承認日時" })
  approvedAt?: Date;

  @ManyToOne(() => ChildEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "requested_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_withdrawal_requests_requested_by" })
  requester!: ChildEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "approved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_withdrawal_requests_approved_by" })
  approver!: FamilyEntity;
  @ManyToOne(() => WithdrawalRequestStatusEntity, { nullable: false, onDelete: "SET NULL" })
  @JoinColumn({ name: "status_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_withdrawal_requests_status_id" })
  status!: WithdrawalRequestStatusEntity;
}
