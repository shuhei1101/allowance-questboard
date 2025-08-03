import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { Icon } from "@backend/features/icon/entity/icon";

/**
 * 家族エンティティ
 */
@Entity("families")
export class Family extends AppBaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false, comment: "家名" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "text", nullable: true, comment: "説明文" })
  introduction?: string;

  @ManyToOne(() => Icon, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_families_icon_id" })
  icon?: Icon;

  /**
   * シード用データ取得
   */
  protected static seedData(): Family[] {
    return [
      // テンプレートクエスト用の家族データ
      Object.assign(new Family(), {
        name: "Template",
        icon_id: 1,
        introduction: ""
      })
    ];
  }
}

/**
 * 家族履歴エンティティ
 */
@Entity("families_history")
export class FamilyHistory extends BaseHistoryEntity<Family> {
  @Column({ type: "varchar", length: 100, nullable: false, comment: "家名" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "text", nullable: true, comment: "説明文" })
  introduction?: string;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: FamilyHistory, source: Family): void {
    instance.name = source.name;
    instance.icon_id = source.icon_id;
    instance.introduction = source.introduction;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyHistory[] {
    // 履歴テーブルは基本的にシードデータなし
    return [];
  }
}
