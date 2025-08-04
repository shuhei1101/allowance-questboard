import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { UserSettingEntity } from "../../login/entity/userSettingEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";

@Entity("user_settings_history")
export class UserSettingHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "設定キー" })
  setting_key!: string;

  @Column({ type: "text", nullable: true, comment: "設定値" })
  setting_value?: string;

  @Column({ type: "varchar", length: 50, nullable: true, default: "string", comment: "設定値のデータ型" })
  value_type?: string;

  @Column({ type: "text", nullable: true, comment: "設定の説明" })
  description?: string;

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  // Relations
  @ManyToOne(() => UserSettingEntity)
  @JoinColumn({ name: "original_id" })
  userSetting?: UserSettingEntity;

  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  /**
   * シードデータ
   */
  protected static seedData(): UserSettingHistoryEntity[] {
    return [
      Object.assign(new UserSettingHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        setting_key: "theme",
        setting_value: "light",
        value_type: "string",
        description: "アプリケーションのテーマ設定",
        is_active: true,
        operation_type: "CREATE" as const,
        operation_timestamp: new Date("2024-01-01T10:00:00Z"),
        operated_by: 1,
      }),
      Object.assign(new UserSettingHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        setting_key: "theme",
        setting_value: "dark",
        value_type: "string",
        description: "アプリケーションのテーマ設定",
        is_active: true,
        operation_type: "UPDATE" as const,
        operation_timestamp: new Date("2024-01-02T14:30:00Z"),
        operated_by: 1,
      }),
    ];
  }
}
