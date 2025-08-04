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
import { FamilyEntity } from "../../family/entity/familyEntity";
import { FamilyMemberTypeEntity } from "./familyMemberTypeEntity";

@Entity("family_members_history")
export class FamilyMemberHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "家族メンバーID" })
  family_member_id!: number;

  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;

  @Column({ type: "int", nullable: false, comment: "家族メンバータイプID" })
  family_member_type_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "名前" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "text", nullable: true, comment: "説明文" })
  introduction?: string;

  // Relations
  @ManyToOne(() => FamilyEntity)
  @JoinColumn({ name: "family_id" })
  family?: FamilyEntity;

  @ManyToOne(() => FamilyMemberTypeEntity)
  @JoinColumn({ name: "family_member_type_id" })
  familyMemberType?: FamilyMemberTypeEntity;

  @ManyToOne(() => IconEntity)
  @JoinColumn({ name: "icon_id" })
  icon?: IconEntity;

  /**
   * シードデータ
   */
  protected static seedData(): FamilyMemberHistoryEntity[] {
    // 履歴テーブルは通常、実際のデータ変更時に自動生成されるため、初期データは空
    return [];
  }
}
