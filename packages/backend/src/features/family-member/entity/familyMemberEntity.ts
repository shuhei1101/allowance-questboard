import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { IconEntity } from "@backend/features/icon/entity/iconEntity";

/**
 * 家族メンバーエンティティ
 */
@Entity("family_members")
@Check("chk_family_members_name_not_empty", "LENGTH(name) > 0")
@Check("chk_family_members_birthday_not_future", "birthday <= CURRENT_DATE")
export class FamilyMemberEntity extends AppBaseEntity {
  @Column({ type: "uuid", nullable: false, comment: "ユーザID(外部キー：auth.users.id)" })
  user_id!: string;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "名前" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID(外部キー、NULL許可)" })
  icon_id?: number;

  @Column({ type: "date", nullable: false, comment: "誕生日(未来日不可)" })
  birthday!: Date;

  @ManyToOne(() => IconEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_member_icon_id" })
  icon?: IconEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMemberEntity[] {
    return [
      // シードデータがある場合はここに追加
    ];
  }
}

/**
 * 家族メンバー履歴エンティティ
 */
@Entity("family_members_history")
export class FamilyMemberHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "uuid", comment: "ユーザID" })
  user_id!: string;

  @Column({ type: "varchar", length: 100, comment: "名前" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID" })
  icon_id?: number;

  @Column({ type: "date", comment: "誕生日" })
  birthday!: Date;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: FamilyMemberHistoryEntity, source: FamilyMemberEntity): void {
    instance.user_id = source.user_id;
    instance.name = source.name;
    instance.icon_id = source.icon_id;
    instance.birthday = source.birthday;
  }
}
