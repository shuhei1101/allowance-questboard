import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * 家族メンバーエンティティ
 */
@Entity("family_members")
@Check("chk_family_members_name_not_empty", "length(name) > 0")
@Check("chk_family_members_birthday_not_future", "birthday <= CURRENT_DATE")
export class FamilyMember extends AppBaseEntity {
  @Column({ type: "uuid", nullable: false, comment: "ユーザID(外部キー：auth.users.id)" })
  user_id!: string;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "名前" })
  name!: string;

  @Column({ type: "int", nullable: true, comment: "アイコンID(外部キー、NULL許可)" })
  icon_id?: number;

  @Column({ type: "date", nullable: false, comment: "誕生日(未来日不可)" })
  birthday!: Date;

  // アイコンとのリレーション（後でIconエンティティができたら有効化）
  // @ManyToOne(() => Icon, { nullable: true, onDelete: "SET NULL" })
  // @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_members_icon_id" })
  // icon?: Icon;

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMember[] {
    // 基本的にはシードデータなし（ユーザ登録時に作成される）
    return [];
  }
}
