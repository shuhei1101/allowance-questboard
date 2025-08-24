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
@Index("idx_notifications_unread", ["recipientId", "isRead"], { where: "is_read = false" })
@Index("idx_notifications_received_at", ["receivedAt"])
export class NotificationEntity extends BaseTransactionEntity {
  @Column({ name: "recipient_id", type: "int", nullable: true, comment: "家族メンバーID" })
  recipientId?: number;
  @Column({ name: "notifiable_type", type: "int", nullable: false, comment: "通知対象タイプID" })
  notifiableType!: number;
  @Column({ name: "push_to", type: "int", nullable: true, comment: "遷移先スクリーンID" })
  pushTo?: number;
  @Column({ name: "is_read", type: "boolean", nullable: false, default: false, comment: "既読フラグ" })
  isRead!: boolean;
  @Column({ name: "read_at", type: "timestamp with time zone", nullable: true, comment: "既読日時" })
  readAt?: Date;
  @Column({ name: "received_at", type: "timestamp with time zone", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "通知受信日時" })
  receivedAt!: Date;

  @ManyToOne(() => FamilyMemberEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "recipient_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_notification_recipient_id" })
  familyMember?: FamilyMemberEntity;
  @ManyToOne(() => NotifiableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "notifiable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_notification_notifiable_type" })
  notifiableTypeRef!: NotifiableTypeEntity;
  @ManyToOne(() => ScreenEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "push_to", referencedColumnName: "id", foreignKeyConstraintName: "fk_notification_push_to" })
  screen?: ScreenEntity;
}
