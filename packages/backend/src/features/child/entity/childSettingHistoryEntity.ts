import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DataSource,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { ChildEntity } from "./childEntity";

@Entity("child_settings_history")
export class ChildSettingHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "子供設定ID" })
  child_setting_id!: number;

  @Column({ type: "int", nullable: false, comment: "子供ID" })
  child_id!: number;

  @Column({ type: "boolean", nullable: false, default: true, comment: "通知有効フラグ" })
  is_notification_enabled!: boolean;

  @Column({ type: "boolean", nullable: false, default: true, comment: "サウンド有効フラグ" })
  is_sound_enabled!: boolean;

  @Column({ type: "varchar", length: 10, nullable: false, default: "ja", comment: "言語設定" })
  language!: string;

  // Relations
  @ManyToOne(() => ChildEntity)
  @JoinColumn({ name: "child_id" })
  child?: ChildEntity;

  /**
   * シードデータ
   */
  protected static seedData(): ChildSettingHistoryEntity[] {
    // 履歴テーブルは通常、実際のデータ変更時に自動生成されるため、初期データは空
    return [];
  }
}
