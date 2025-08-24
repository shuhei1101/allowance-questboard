import {
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  DataSource,
} from "typeorm";
import { AppBaseEntity, BaseEntityProtocol } from "./appBaseEntity";
import { BaseTransactionEntity } from "./baseTransactionEntity";
import { LanguageEntity } from "@backend/features/language/entity/languageEntity";

/**
 * 翻訳可能エンティティのインターフェース
 */
export interface TranslationEntityProtocol extends BaseEntityProtocol {
  languageId: number;
  language: LanguageEntity;
  get sourceId(): number;
}

/**
 * マスタテーブル翻訳用の基底クラス
 * IDは自動採番、seedDataで管理
 */
export abstract class BaseMasterTranslationEntity extends AppBaseEntity implements TranslationEntityProtocol {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "language_id", type: "int", nullable: false, comment: "言語ID" })
  languageId!: number;

  @ManyToOne(() => LanguageEntity, { nullable: false, onDelete: "SET NULL" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_language_id" })
  language!: LanguageEntity;

  /**
   * 翻訳元レコードのIDを返す（抽象プロパティ）
   * サブクラスで実装必須
   */
  abstract get sourceId(): number;
}

/**
 * トランザクションテーブル翻訳用の基底クラス
 */
export abstract class BaseTransactionTranslationEntity extends BaseTransactionEntity implements TranslationEntityProtocol {
  @Column({ name: "language_id", type: "int", nullable: false, comment: "言語ID" })
  languageId!: number;

  @ManyToOne(() => LanguageEntity, { nullable: false, onDelete: "SET NULL" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_language_id" })
  language!: LanguageEntity;

  /**
   * 翻訳元レコードのIDを返す（抽象プロパティ）
   * サブクラスで実装必須
   */
  abstract get sourceId(): number;
}
