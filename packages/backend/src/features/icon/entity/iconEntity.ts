import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";
import { IconCategoryEntity } from "src/features/icon-category/entity/iconCategoryEntity";

/**
 * アイコンエンティティ
 */
@Entity("icons")
export class IconEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "int", nullable: true, comment: "アイコンカテゴリID" })
  category_id?: number;
  @Column({ type: "int", default: 0, comment: "表示順序" })
  sort_order!: number;
  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  @ManyToOne(() => IconCategoryEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icon_category_id" })
  category?: IconCategoryEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): IconEntity[] {
    return [
      Object.assign(new IconEntity(), { id: 1, category_id: 1, sort_order: 10, is_active: true }),
      Object.assign(new IconEntity(), { id: 2, category_id: 2, sort_order: 10, is_active: true }),
      Object.assign(new IconEntity(), { id: 3, category_id: 3, sort_order: 10, is_active: true }),
    ];
  }
}
