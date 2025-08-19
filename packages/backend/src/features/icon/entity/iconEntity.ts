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
  @Column({ type: "varchar", length: 255, nullable: false, unique: true, comment: "Lucideアイコン名" })
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
      Object.assign(new IconEntity(), { id: 1, category_id: 1, name: "Brush", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 2, category_id: 1, name: "Home", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 3, category_id: 1, name: "Droplets", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 4, category_id: 1, name: "Shirt", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 5, category_id: 1, name: "Wrench", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 6, category_id: 1, name: "Trash2", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 7, category_id: 1, name: "Bed", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 8, category_id: 1, name: "Clipboard", sort_order: 8, is_active: true }),

      // 勉強・学習系アイコン (category_id: 2)
      Object.assign(new IconEntity(), { id: 9, category_id: 2, name: "Book", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 10, category_id: 2, name: "GraduationCap", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 11, category_id: 2, name: "PenTool", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 12, category_id: 2, name: "Calculator", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 13, category_id: 2, name: "Laptop", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 14, category_id: 2, name: "HelpCircle", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 15, category_id: 2, name: "Library", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 16, category_id: 2, name: "MessageCircle", sort_order: 8, is_active: true }),

      // スポーツ・運動系アイコン (category_id: 3)
      Object.assign(new IconEntity(), { id: 17, category_id: 3, name: "Football", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 18, category_id: 3, name: "Dumbbell", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 19, category_id: 3, name: "CircleDot", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 20, category_id: 3, name: "Sailboat", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 21, category_id: 3, name: "PersonStanding", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 22, category_id: 3, name: "Bike", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 23, category_id: 3, name: "Weight", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 24, category_id: 3, name: "Trophy", sort_order: 8, is_active: true }),

      // 料理・食事系アイコン (category_id: 4)
      Object.assign(new IconEntity(), { id: 25, category_id: 4, name: "UtensilsCrossed", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 26, category_id: 4, name: "Pizza", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 27, category_id: 4, name: "Wine", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 28, category_id: 4, name: "Apple", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 29, category_id: 4, name: "Cake", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 30, category_id: 4, name: "Coffee", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 31, category_id: 4, name: "IceCream", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 32, category_id: 4, name: "Fish", sort_order: 8, is_active: true }),

      // お買い物・外出系アイコン (category_id: 5)
      Object.assign(new IconEntity(), { id: 33, category_id: 5, name: "ShoppingCart", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 34, category_id: 5, name: "Store", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 35, category_id: 5, name: "ShoppingBag", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 36, category_id: 5, name: "Car", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 37, category_id: 5, name: "Bus", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 38, category_id: 5, name: "Map", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 39, category_id: 5, name: "MapPin", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 40, category_id: 5, name: "Wallet", sort_order: 8, is_active: true }),

      // ペット・動物系アイコン (category_id: 6)
      Object.assign(new IconEntity(), { id: 41, category_id: 6, name: "Heart", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 42, category_id: 6, name: "Dog", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 43, category_id: 6, name: "Star", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 44, category_id: 6, name: "User", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 45, category_id: 6, name: "Flower", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 46, category_id: 6, name: "Plus", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 47, category_id: 6, name: "Leaf", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 48, category_id: 6, name: "Sun", sort_order: 8, is_active: true }),

      // 趣味・創作系アイコン (category_id: 7)
      Object.assign(new IconEntity(), { id: 49, category_id: 7, name: "Palette", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 50, category_id: 7, name: "Music", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 51, category_id: 7, name: "Camera", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 52, category_id: 7, name: "Paintbrush", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 53, category_id: 7, name: "Piano", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 54, category_id: 7, name: "Smile", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 55, category_id: 7, name: "BookOpen", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 56, category_id: 7, name: "Pencil", sort_order: 8, is_active: true }),

      // 健康・美容系アイコン (category_id: 8)
      Object.assign(new IconEntity(), { id: 57, category_id: 8, name: "UserCheck", sort_order: 1, is_active: true }),
      Object.assign(new IconEntity(), { id: 58, category_id: 8, name: "Activity", sort_order: 2, is_active: true }),
      Object.assign(new IconEntity(), { id: 59, category_id: 8, name: "Bandage", sort_order: 3, is_active: true }),
      Object.assign(new IconEntity(), { id: 60, category_id: 8, name: "Droplet", sort_order: 4, is_active: true }),
      Object.assign(new IconEntity(), { id: 61, category_id: 8, name: "Scissors", sort_order: 5, is_active: true }),
      Object.assign(new IconEntity(), { id: 62, category_id: 8, name: "Paintbrush2", sort_order: 6, is_active: true }),
      Object.assign(new IconEntity(), { id: 63, category_id: 8, name: "Shield", sort_order: 7, is_active: true }),
      Object.assign(new IconEntity(), { id: 64, category_id: 8, name: "Scale3D", sort_order: 8, is_active: true }),
    ];
  }
}
