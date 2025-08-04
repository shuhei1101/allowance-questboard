import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";

@Entity("notifiable_types")
export class NotifiableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "通知対象テーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "通知対象タイプの説明" })
  description!: string;

  /**
   * シードデータ
   */
  protected static seedData(): NotifiableTypeEntity[] {
    return [
      Object.assign(new NotifiableTypeEntity(), { table_name: "quest_completed", description: "クエスト完了通知" }),
      Object.assign(new NotifiableTypeEntity(), { table_name: "allowance_received", description: "お小遣い受取通知" }),
      Object.assign(new NotifiableTypeEntity(), { table_name: "withdrawal_approved", description: "引き出し承認通知" }),
      Object.assign(new NotifiableTypeEntity(), { table_name: "level_up", description: "レベルアップ通知" }),
    ];
  }
}
