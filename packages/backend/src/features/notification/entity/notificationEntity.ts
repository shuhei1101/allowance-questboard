import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { NotifiableTypeEntity } from "./notifiableTypeEntity";
import { ScreenEntity } from "@backend/features/shared/entity/screenEntity";

/**
 * 通知エンティティ
 */
@Entity("notifications")
@Index("idx_notifications_unread", ["recipient_id", "is_read"], { where: "is_read = false" })
@Index("idx_notifications_received_at", ["received_at"])
export class NotificationEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: true, comment: "家族メンバーID" })
  recipient_id?: number;
  @Column({ type: "int", nullable: false, comment: "通知対象タイプID" })
  notifiable_type!: number;
  @Column({ type: "int", nullable: true, comment: "遷移先スクリーンID" })
  push_to?: number;
  @Column({ type: "boolean", nullable: false, default: false, comment: "既読フラグ" })
  is_read!: boolean;
  @Column({ type: "timestamp with time zone", nullable: true, comment: "既読日時" })
  read_at?: Date;
  @Column({ type: "timestamp with time zone", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "通知受信日時" })
  received_at!: Date;

  @ManyToOne(() => FamilyMemberEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "recipient_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_notification_recipient_id" })
  family_member?: FamilyMemberEntity;
  @ManyToOne(() => NotifiableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "notifiable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_notification_notifiable_type" })
  notifiable_type_ref!: NotifiableTypeEntity;
  @ManyToOne(() => ScreenEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "push_to", referencedColumnName: "id", foreignKeyConstraintName: "fk_notification_push_to" })
  screen?: ScreenEntity;
}
