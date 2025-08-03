import {
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "./appBaseEntity";
import { Language } from "@backend/features/language/entity/language";

/**
 * 翻訳テーブル用の基底クラス
 */
export abstract class BaseTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @ManyToOne(() => Language, { nullable: false, onDelete: "SET NULL" })
  @JoinColumn({ name: "language_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_language_id" })
  language!: Language;

  /**
   * 翻訳元レコードのIDを返す（抽象プロパティ）
   * サブクラスで実装必須
   */
  abstract get sourceId(): number;
}
