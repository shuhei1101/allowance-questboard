import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { Language } from "@backend/features/language/entity/language";

/**
 * ユーザ設定エンティティ
 */
@Entity("user_settings")
export class UserSettings extends AppBaseEntity {
  @PrimaryColumn({ type: "uuid", comment: "ユーザID" })
  user_id!: string;

  @Column({ type: "int", nullable: false, comment: "言語コード" })
  language_id!: number;

  @ManyToOne(() => Language, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_user_settings_language_id" })
  language!: Language;

  /**
   * シード用データ取得
   */
  protected static seedData(): UserSettings[] {
    // ユーザ設定は動的に作成されるためシードデータなし
    return [];
  }
}

/**
 * ユーザ設定履歴エンティティ
 */
@Entity("user_settings_history")
export class UserSettingsHistory extends BaseHistoryEntity<UserSettings> {
  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "int" })
  language_id!: number;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: UserSettingsHistory, source: UserSettings): void {
    instance.user_id = source.user_id;
    instance.language_id = source.language_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): UserSettingsHistory[] {
    return [];
  }
}
