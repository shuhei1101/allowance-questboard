import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { IconCategory } from "@backend/features/icon-category/entity/iconCategory";

/**
 * アイコンエンティティ
 */
@Entity("icons")
export class Icon extends AppBaseEntity {
  @Column({ type: "int", nullable: true, comment: "アイコンカテゴリID" })
  category_id?: number;

  @Column({ type: "int", default: 0, comment: "表示順序" })
  sort_order!: number;

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  @ManyToOne(() => IconCategory, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icons_category_id" })
  category?: IconCategory;

  /**
   * シード用データ取得
   */
  protected static seedData(): Icon[] {
    return [
      Object.assign(new Icon(), {
        category_id: 1,
        sort_order: 10,
        is_active: true
      }),
      Object.assign(new Icon(), {
        category_id: 2,
        sort_order: 10,
        is_active: true
      }),
      Object.assign(new Icon(), {
        category_id: 3,
        sort_order: 10,
        is_active: true
      }),
    ];
  }
}
