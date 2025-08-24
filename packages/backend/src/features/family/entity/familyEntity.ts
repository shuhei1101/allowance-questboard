import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { IconEntity } from "@backend/features/icon/entity/iconEntity";

/** 家族エンティティ */
@Entity("families")
export class FamilyEntity extends BaseTransactionEntity {
  @Column({ name: "name", type: "varchar", length: 100, nullable: false, comment: "家名" })
  name!: string;
  @Column({ name: "icon_id", type: "int", nullable: true, comment: "アイコンID" })
  iconId?: number;
  @Column({ name: "introduction", type: "text", nullable: true, default: "", comment: "説明文" })
  introduction!: string;

  @ManyToOne(() => IconEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_icon_id" })
  icon?: IconEntity;
  members: any;
  
  static fromRaw(params: {
    id?: number;
    name: string;
    iconId?: number;
    introduction: string;
  }): FamilyEntity {
    const entity = new FamilyEntity();
    if (params.id) entity.id = params.id;
    entity.name = params.name;
    if (params.iconId) entity.iconId = params.iconId;
    entity.introduction = params.introduction;
    return entity;
  }

  /** シード用データ取得 */
  protected static seedData(): FamilyEntity[] {1
    return [
      // テンプレートクエスト用の家族データ
      Object.assign(new FamilyEntity(), { name: "Template", iconId: 1, introduction: "" }),
    ];
  }
}

/** 家族履歴エンティティ */
@Entity("families_history")
export class FamilyHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int" })
  familyId!: number;
  @Column({ type: "varchar" })
  name!: string;
  @Column({ type: "int" })
  iconId?: number;
  @Column({ type: "text" })
  introduction?: string;

  /** サブクラス固有の属性をセット */
  protected static setSpecificAttrs(instance: FamilyHistoryEntity, source: FamilyEntity): void {
    instance.familyId = source.id;
    instance.name = source.name;
    instance.iconId = source.iconId;
    instance.introduction = source.introduction;
  }
}
