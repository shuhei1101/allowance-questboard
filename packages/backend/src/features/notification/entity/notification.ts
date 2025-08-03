import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { FamilyMember } from "@backend/features/family-member/entity/familyMember";
import { Screen } from "@backend/shared/entity/screen";

/**
 * 通知エンティティ
 */
@Entity("notifications")
@Index("idx_notifications_unread", ["recipient_id", "is_read"], { where: "is_read = false" })
@Index("idx_notifications_received_at", ["received_at"])
export class Notification extends AppBaseEntity {
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

  @ManyToOne(() => FamilyMember, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "recipient_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_notifications_recipient_id" })
  family_member?: FamilyMember;

  // NotifiableTypesとのリレーションは後で追加予定
  // @ManyToOne(() => NotifiableType, { nullable: false, onDelete: "RESTRICT" })
  // @JoinColumn({ name: "notifiable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_notifications_notifiable_type" })
  // notifiable_type_ref!: NotifiableType;

  @ManyToOne(() => Screen, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "push_to", referencedColumnName: "id", foreignKeyConstraintName: "fk_notifications_push_to" })
  screen?: Screen;

  /**
   * シード用データ取得
   */
  protected static seedData(): Notification[] {
    // 通知は動的に作成されるためシードデータなし
    return [];
  }
}
