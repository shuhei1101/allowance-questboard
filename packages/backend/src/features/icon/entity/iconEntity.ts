import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "@backend/core/entity/baseMasterEntity";
import { IconCategoryEntity } from "@backend/features/icon-category/entity/iconCategoryEntity";

/**
 * アイコンエンティティ
 */
@Entity("icons")
export class IconEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "int", nullable: true, comment: "アイコンカテゴリID" })
  category_id?: number;
  @Column({ type: "varchar", length: 255, nullable: false, comment: "expo/vector-iconsのアイコン名" })
  name!: string;
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
      // 家事・掃除系アイコン (category_id: 1)
      Object.assign(new IconEntity(), { id: 1, category_id: 1, name: "cleaning-services", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 2, category_id: 1, name: "vacuum", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 3, category_id: 1, name: "wash", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 4, category_id: 1, name: "iron", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 5, category_id: 1, name: "home-repair-service", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 6, category_id: 1, name: "broom", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 7, category_id: 1, name: "mop", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 8, category_id: 1, name: "local-laundry-service", sort_order: 8, is_active: true }),

      // 勉強・学習系アイコン (category_id: 2)
      Object.assign(new IconEntity(), { id: 9, category_id: 2, name: "book", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 10, category_id: 2, name: "school", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 11, category_id: 2, name: "edit", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 12, category_id: 2, name: "calculate", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 13, category_id: 2, name: "laptop", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 14, category_id: 2, name: "quiz", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 15, category_id: 2, name: "library-books", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 16, category_id: 2, name: "language", sort_order: 8, is_active: true }),

      // スポーツ・運動系アイコン (category_id: 3)
      Object.assign(new IconEntity(), { id: 17, category_id: 3, name: "sports-soccer", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 18, category_id: 3, name: "sports-basketball", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 19, category_id: 3, name: "sports-tennis", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 20, category_id: 3, name: "pool", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 21, category_id: 3, name: "directions-run", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 22, category_id: 3, name: "directions-bike", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 23, category_id: 3, name: "fitness-center", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 24, category_id: 3, name: "sports-volleyball", sort_order: 8, is_active: true }),

      // 料理・食事系アイコン (category_id: 4)
      Object.assign(new IconEntity(), { id: 25, category_id: 4, name: "restaurant", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 26, category_id: 4, name: "kitchen", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 27, category_id: 4, name: "lunch-dining", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 28, category_id: 4, name: "local-pizza", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 29, category_id: 4, name: "cake", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 30, category_id: 4, name: "coffee", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 31, category_id: 4, name: "dinner-dining", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 32, category_id: 4, name: "local-dining", sort_order: 8, is_active: true }),

      // お買い物・外出系アイコン (category_id: 5)
      Object.assign(new IconEntity(), { id: 33, category_id: 5, name: "shopping-cart", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 34, category_id: 5, name: "local-grocery-store", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 35, category_id: 5, name: "shopping-bag", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 36, category_id: 5, name: "directions-car", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 37, category_id: 5, name: "directions-bus", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 38, category_id: 5, name: "map", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 39, category_id: 5, name: "store", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 40, category_id: 5, name: "local-mall", sort_order: 8, is_active: true }),

      // ペット・動物系アイコン (category_id: 6)
      Object.assign(new IconEntity(), { id: 41, category_id: 6, name: "pets", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 42, category_id: 6, name: "cruelty-free", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 43, category_id: 6, name: "favorite", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 44, category_id: 6, name: "child-care", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 45, category_id: 6, name: "spa", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 46, category_id: 6, name: "local-hospital", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 47, category_id: 6, name: "eco", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 48, category_id: 6, name: "nature", sort_order: 8, is_active: true }),

      // 趣味・創作系アイコン (category_id: 7)
      Object.assign(new IconEntity(), { id: 49, category_id: 7, name: "palette", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 50, category_id: 7, name: "music-note", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 51, category_id: 7, name: "camera", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 52, category_id: 7, name: "brush", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 53, category_id: 7, name: "piano", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 54, category_id: 7, name: "theater-comedy", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 55, category_id: 7, name: "auto-stories", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 56, category_id: 7, name: "create", sort_order: 8, is_active: true }),

      // 健康・美容系アイコン (category_id: 8)
      Object.assign(new IconEntity(), { id: 57, category_id: 8, name: "face", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 58, category_id: 8, name: "self-improvement", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 59, category_id: 8, name: "healing", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 60, category_id: 8, name: "shower", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 61, category_id: 8, name: "cut", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 62, category_id: 8, name: "content-cut", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 63, category_id: 8, name: "masks", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 64, category_id: 8, name: "monitor-weight", sort_order: 8, is_active: true }),
    ];
  }
}
