import { Entity, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { ChildEntity } from "src/features/child/entity/childEntity";
import { FamilyEntity } from "src/features/family/entity/familyEntity";
import { WithdrawalRequestStatusEntity } from "./withdrawalRequestStatusEntity";

/**
 * 引き落とし申請エンティティ
 */
@Entity("withdrawal_requests")
@Check("chk_withdrawal_requests_amount_positive", "amount > 0")
export class WithdrawalRequestEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "申請者の子供ID" })
  requested_by!: number;
  @Column({ type: "int", nullable: false, comment: "承認者の家族ID" })
  approved_by!: number;
  @Column({ type: "int", nullable: false, comment: "申請ステータスID" })
  status_id!: number;
  @Column({ type: "int", nullable: false, comment: "引き落とし金額" })
  amount!: number;
  @Column({ type: "varchar", length: 500, nullable: false, comment: "引き落とし理由" })
  reason!: string;
  @Column({ type: "timestamp", nullable: false, comment: "申請日時" })
  requested_at!: Date;
  @Column({ type: "timestamp", nullable: true, comment: "承認日時" })
  approved_at?: Date;

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
