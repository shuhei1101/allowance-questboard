import {
  Column,
} from "typeorm";
import { BaseTransactionEntity } from "./baseTransactionEntity";

/**
 * 履歴テーブル用の基底クラス
 * @template T 元のエンティティの型
 */
export abstract class BaseHistoryEntity extends BaseTransactionEntity {
  @Column({ type: "int", comment: "元のレコードID" })
  source_id!: number;
  @Column({ type: "int", comment: "元のレコードのバージョン" })
  source_version!: number;
  @Column({ type: "timestamp with time zone", comment: "元レコードの作成日時" })
  source_created_at!: Date;
  @Column({ type: "int", nullable: true, comment: "元レコードの作成者ID" })
  source_created_by?: number;
  @Column({ type: "int", nullable: true, comment: "元レコードの作成元スクリーンID" })
  source_created_from?: number;
  @Column({ type: "timestamp with time zone", comment: "元レコードの更新日時" })
  source_updated_at!: Date;
  @Column({ type: "int", nullable: true, comment: "元レコードの更新者ID" })
  source_updated_by?: number;
  @Column({ type: "int", nullable: true, comment: "元レコードの更新元スクリーンID" })
  source_updated_from?: number;

  /**
   * 元のレコードから履歴エンティティを生成
   * @param source 元のエンティティ
   * @returns 履歴エンティティのインスタンス
   */
  static fromSource<T extends BaseTransactionEntity>(source: T): BaseHistoryEntity {
    // TypeScriptではnewを使ってインスタンス生成
    const instance = new (this as any)();
    
    // 基底クラスの属性をセット
    instance.source_id = source.id;
    instance.source_version = source.version;
    instance.source_created_at = source.created_at;
    instance.source_created_by = (source.created_by as any)?.id;
    instance.source_created_from = (source.created_from as any)?.id;
    instance.source_updated_at = source.updated_at;
    instance.source_updated_by = (source.updated_by as any)?.id;
    instance.source_updated_from = (source.updated_from as any)?.id;

    // サブクラス固有の属性をセット
    this.setSpecificAttrs(instance, source);
    
    return instance;
  }

  /**
   * サブクラス固有の属性をセット（実装必須）
   * 
   * 例:
   * ```typescript
   * instance.some_attr = source.some_attr;
   * instance.another_attr = source.another_attr;
   * ```
   * 
   * @param instance 履歴エンティティのインスタンス
   * @param source 元のエンティティ
   */
  protected static setSpecificAttrs(
    instance: any, 
    source: any
  ): void {
    throw new Error("Subclasses must implement setSpecificAttrs method to set specific attributes.");
  }
}
