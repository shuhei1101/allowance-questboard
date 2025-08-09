import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "../../../core/entity/baseMasterEntity";

@Entity("notifiable_types")
export class NotifiableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "通知対象テーブル名" })
  table_name!: string;
  @Column({ type: "text", nullable: false, comment: "通知対象タイプの説明" })
  description!: string;

  /**
   * シードデータ
   */
  protected static seedData(): NotifiableTypeEntity[] {
    return [
      Object.assign(new NotifiableTypeEntity(), { id: 1, table_name: "quest_members", description: "クエストメンバーに対する通知" }),
    ];
  }
}
