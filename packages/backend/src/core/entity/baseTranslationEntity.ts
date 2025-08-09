import {
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  DataSource,
} from "typeorm";
import { AppBaseEntity } from "./appBaseEntity";
import { BaseTransactionEntity } from "./baseTransactionEntity";
import { LanguageEntity } from "@backend/features/language/entity/languageEntity";
import { seed } from "./seedMixin";

/**
 * 翻訳可能エンティティのインターフェース
 */
export interface TranslationableEntity {
  language_id: number;
  language: LanguageEntity;
  get sourceId(): number;
}

/**
 * マスタテーブル翻訳用の基底クラス
 * IDは自動採番、seedDataで管理
 */
export abstract class BaseMasterTranslationEntity extends AppBaseEntity implements TranslationableEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @ManyToOne(() => LanguageEntity, { nullable: false, onDelete: "SET NULL" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_language_id" })
  language!: LanguageEntity;

  /**
   * 翻訳元レコードのIDを返す（抽象プロパティ）
   * サブクラスで実装必須
   */
  abstract get sourceId(): number;

  // シード用データ取得（抽象）
  protected static seedData(): BaseMasterTranslationEntity[] {
    throw new Error("seedData must be implemented in subclass");
  }

  // シード処理（ヘルパー関数を使用）
  static async seed(dataSource: DataSource): Promise<void> {
    await seed(this as any, dataSource);
  }
}

/**
 * トランザクションテーブル翻訳用の基底クラス
 */
export abstract class BaseTransactionTranslationEntity extends BaseTransactionEntity implements TranslationableEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @ManyToOne(() => LanguageEntity, { nullable: false, onDelete: "SET NULL" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_language_id" })
  language!: LanguageEntity;

  /**
   * 翻訳元レコードのIDを返す（抽象プロパティ）
   * サブクラスで実装必須
   */
  abstract get sourceId(): number;
}
