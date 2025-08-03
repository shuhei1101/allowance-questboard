import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { IconEntity } from "@backend/features/icon/entity/iconEntity";

/**
 * 家族エンティティ
 */
@Entity("families")
export class FamilyEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false, comment: "家名" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "text", nullable: true, comment: "説明文" })
  introduction?: string;

  @ManyToOne(() => IconEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_icon_id" })
  icon?: IconEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyEntity[] {
    return [
      Object.assign(new FamilyEntity(), {
        name: "Template",
        icon_id: 1,
        introduction: "",
      }),
    ];
  }
}

/**
 * 家族履歴エンティティ
 */
@Entity("families_history")
export class FamilyHistoryEntity extends BaseHistoryEntity<FamilyEntity> {
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "家名" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "text", nullable: true, comment: "説明文" })
  introduction?: string;

  @ManyToOne(() => IconEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_history_icon_id" })
  icon?: IconEntity;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: FamilyHistoryEntity, source: FamilyEntity): void {
    instance.family_id = source.id;
    instance.name = source.name;
    instance.icon_id = source.icon_id;
    instance.introduction = source.introduction;
  }
}
