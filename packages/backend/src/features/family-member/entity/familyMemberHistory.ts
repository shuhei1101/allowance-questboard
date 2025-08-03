import {
  Entity,
  Column,
} from "typeorm";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { FamilyMember } from "./familyMember";

/**
 * 家族メンバー履歴エンティティ
 */
@Entity("family_members_history")
export class FamilyMemberHistory extends BaseHistoryEntity<FamilyMember> {
  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "int", nullable: true })
  icon_id?: number;

  @Column({ type: "date" })
  birthday!: Date;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: FamilyMemberHistory, source: FamilyMember): void {
    instance.user_id = source.user_id;
    instance.name = source.name;
    instance.icon_id = source.icon_id;
    instance.birthday = source.birthday;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMemberHistory[] {
    // 履歴テーブルは基本的にシードデータなし
    return [];
  }
}
