import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DataSource,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { IconEntity } from "../../icon/entity/iconEntity";

@Entity("families_history")
export class FamilyHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "家名" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "text", nullable: true, comment: "説明文" })
  introduction?: string;

  // Relations
  @ManyToOne(() => IconEntity)
  @JoinColumn({ name: "icon_id" })
  icon?: IconEntity;

  /**
   * シードデータ
   */
  protected static seedData(): FamilyHistoryEntity[] {
    // 履歴テーブルは通常、実際のデータ変更時に自動生成されるため、初期データは空
    return [];
  }
}
