import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * レベルサブタイプエンティティ
 */
@Entity("level_table_types")
export class LevelTableType extends AppBaseEntity {
  @Column({ type: "varchar", nullable: false, unique: true, comment: "レベルテーブルサブタイプ名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): LevelTableType[] {
    return [
      Object.assign(new LevelTableType(), {
        table_name: "shared_level_tables",
        description: "共有レベルテーブル"
      }),
      Object.assign(new LevelTableType(), {
        table_name: "family_level_tables",
        description: "家族レベルテーブル"
      }),
      Object.assign(new LevelTableType(), {
        table_name: "child_level_tables",
        description: "子供レベルテーブル"
      }),
    ];
  }
}

/**
 * レベルテーブル基底クラスエンティティ
 */
@Entity("level_tables")
@Check("chk_level_tables_subclass_type_positive", "subclass_type >= 0")
export class LevelTable extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "サブクラスタイプ" })
  subclass_type!: number;

  @ManyToOne(() => LevelTableType, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "subclass_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_level_tables_subclass_type" })
  subclass_type_ref!: LevelTableType;

  /**
   * シード用データ取得
   */
  protected static seedData(): LevelTable[] {
    return [
      Object.assign(new LevelTable(), {
        subclass_type: 1  // 共有レベルテーブル
      }),
      Object.assign(new LevelTable(), {
        subclass_type: 2  // 家族レベルテーブル
      }),
      Object.assign(new LevelTable(), {
        subclass_type: 3  // 子供レベルテーブル
      }),
    ];
  }
}
