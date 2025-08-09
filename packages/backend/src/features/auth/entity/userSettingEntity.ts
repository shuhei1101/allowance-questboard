import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { LanguageEntity } from "@backend/features/language/entity/languageEntity";

/**
 * ユーザ設定エンティティ
 * 注意：このエンティティはUUIDを主キーに使用するため、AppBaseEntityを継承
 */
@Entity("user_settings")
export class UserSettingEntity extends BaseTransactionEntity {
  @PrimaryColumn({ type: "uuid", comment: "ユーザID" })
  user_id!: string;
  @Column({ type: "int", nullable: false, comment: "言語コード" })
  language_id!: number;

  @ManyToOne(() => LanguageEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_user_settings_language_id" })
  language!: LanguageEntity;
}

/**
 * ユーザ設定履歴エンティティ
 */
@Entity("user_settings_history")
export class UserSettingHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "uuid" })
  user_id!: string;
  @Column({ type: "int", nullable: false })
  language_id!: number;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: UserSettingHistoryEntity, source: UserSettingEntity): void {
    instance.user_id = source.user_id;
    instance.language_id = source.language_id;
  }
}
