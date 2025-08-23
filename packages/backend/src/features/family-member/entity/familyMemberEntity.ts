import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { IconEntity } from "@backend/features/icon/entity/iconEntity";

/**
 * 家族メンバーエンティティ
 */
@Entity("family_members")
@Check("chk_family_members_name_not_empty", "LENGTH(name) > 0")
@Check("chk_family_members_birthday_not_future", "birthday <= CURRENT_DATE")
export class FamilyMemberEntity extends BaseTransactionEntity {
  @Column({ type: "uuid", nullable: false, comment: "ユーザID(外部キー：auth.users.id)" })
  userId!: string;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "名前" })
  name!: string;
  @Column({ type: "int", nullable: true, comment: "アイコンID(外部キー、NULL許可)" })
  iconId?: number;
  @Column({ type: "date", nullable: false, comment: "誕生日(未来日不可)" })
  birthday!: Date;

  @ManyToOne(() => IconEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "icon_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_member_icon_id" })
  icon?: IconEntity;

  static fromRaw(params: {
    id?: number;
    userId: string;
    name: string;
    iconId?: number;
    birthday: Date;
  }): FamilyMemberEntity {
    const entity = new FamilyMemberEntity();
    if (params.id !== undefined) entity.id = params.id;
    entity.userId = params.userId;
    entity.name = params.name;
    entity.iconId = params.iconId;
    entity.birthday = params.birthday;
    return entity;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): FamilyMemberEntity[] {
    return [];
  }
}
