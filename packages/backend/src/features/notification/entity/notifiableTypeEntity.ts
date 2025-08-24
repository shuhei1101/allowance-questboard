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
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", length: 50, nullable: false, unique: true, comment: "通知対象テーブル名" })
  tableName!: string;
  @Column({ name: "description", type: "text", nullable: false, comment: "通知対象タイプの説明" })
  description!: string;

  /**
   * シードデータ
   */
  protected static seedData(): NotifiableTypeEntity[] {
    return [
      Object.assign(new NotifiableTypeEntity(), { id: 1, tableName: "quest_members", description: "クエストメンバーに対する通知" }),
    ];
  }
}
