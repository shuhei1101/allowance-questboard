import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AppBaseEntity } from "./appBaseEntity";

/**
 * トランザクションテーブル用の基底エンティティクラス
 * 履歴管理用のカラムを全て保持
 */
export abstract class BaseTransactionEntity extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @CreateDateColumn({ type: "timestamp with time zone", comment: "作成日時" })
  created_at!: Date;
  @Column({ type: "int", nullable: true, comment: "作成者ID" })
  created_by?: number;
  @Column({ type: "int", nullable: true, comment: "作成元スクリーンID" })
  created_from?: number;
  @UpdateDateColumn({ type: "timestamp with time zone", comment: "更新日時" })
  updated_at!: Date;
  @Column({ type: "int", nullable: true, comment: "更新者ID" })
  updated_by?: number;
  @Column({ type: "int", nullable: true, comment: "更新元スクリーンID" })
  updated_from?: number;

  // ドメインモデルからエンティティ生成（抽象）
  static fromModel(model: any): AppBaseEntity {
    throw new Error("fromModel must be implemented in subclass");
  }
}
