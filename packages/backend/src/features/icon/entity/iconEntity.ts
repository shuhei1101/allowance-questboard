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
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "category_id", type: "int", nullable: true, comment: "アイコンカテゴリID" })
  categoryId?: number;
  @Column({ name: "name", type: "varchar", length: 255, nullable: false, unique: true, comment: "Lucideアイコン名" })
  name!: string;
  @Column({ name: "sort_order", type: "int", default: 0, comment: "表示順序" })
  sortOrder!: number;
  @Column({ name: "is_active", type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  isActive!: boolean;

  @ManyToOne(() => IconCategoryEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_icon_category_id" })
  category?: IconCategoryEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): IconEntity[] {
    return [
      // 家事・掃除系アイコン (categoryId: 1)
      Object.assign(new IconEntity(), { id: 1, categoryId: 1, name: "Brush", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 2, categoryId: 1, name: "Home", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 3, categoryId: 1, name: "Droplets", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 4, categoryId: 1, name: "Shirt", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 5, categoryId: 1, name: "Wrench", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 6, categoryId: 1, name: "Trash2", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 7, categoryId: 1, name: "Bed", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 8, categoryId: 1, name: "Clipboard", sortOrder: 8, isActive: true }),

      // 勉強・学習系アイコン (categoryId: 2)
      Object.assign(new IconEntity(), { id: 9, categoryId: 2, name: "Book", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 10, categoryId: 2, name: "GraduationCap", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 11, categoryId: 2, name: "PenTool", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 12, categoryId: 2, name: "Calculator", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 13, categoryId: 2, name: "Laptop", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 14, categoryId: 2, name: "HelpCircle", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 15, categoryId: 2, name: "Library", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 16, categoryId: 2, name: "MessageCircle", sortOrder: 8, isActive: true }),

      // スポーツ・運動系アイコン (categoryId: 3)
      Object.assign(new IconEntity(), { id: 17, categoryId: 3, name: "Zap", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 18, categoryId: 3, name: "Dumbbell", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 19, categoryId: 3, name: "CircleDot", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 20, categoryId: 3, name: "Sailboat", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 21, categoryId: 3, name: "PersonStanding", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 22, categoryId: 3, name: "Bike", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 23, categoryId: 3, name: "Weight", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 24, categoryId: 3, name: "Trophy", sortOrder: 8, isActive: true }),

      // 料理・食事系アイコン (categoryId: 4)
      Object.assign(new IconEntity(), { id: 25, categoryId: 4, name: "UtensilsCrossed", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 26, categoryId: 4, name: "Pizza", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 27, categoryId: 4, name: "Wine", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 28, categoryId: 4, name: "Apple", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 29, categoryId: 4, name: "Cake", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 30, categoryId: 4, name: "Coffee", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 31, categoryId: 4, name: "IceCream", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 32, categoryId: 4, name: "Fish", sortOrder: 8, isActive: true }),

      // お買い物・外出系アイコン (categoryId: 5)
      Object.assign(new IconEntity(), { id: 33, categoryId: 5, name: "ShoppingCart", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 34, categoryId: 5, name: "Store", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 35, categoryId: 5, name: "ShoppingBag", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 36, categoryId: 5, name: "Car", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 37, categoryId: 5, name: "Bus", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 38, categoryId: 5, name: "Map", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 39, categoryId: 5, name: "MapPin", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 40, categoryId: 5, name: "Wallet", sortOrder: 8, isActive: true }),

      // ペット・動物系アイコン (categoryId: 6)
      Object.assign(new IconEntity(), { id: 41, categoryId: 6, name: "Heart", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 42, categoryId: 6, name: "Dog", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 43, categoryId: 6, name: "Star", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 44, categoryId: 6, name: "User", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 45, categoryId: 6, name: "Flower", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 46, categoryId: 6, name: "Plus", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 47, categoryId: 6, name: "Leaf", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 48, categoryId: 6, name: "Sun", sortOrder: 8, isActive: true }),

      // 趣味・創作系アイコン (categoryId: 7)
      Object.assign(new IconEntity(), { id: 49, categoryId: 7, name: "Palette", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 50, categoryId: 7, name: "Music", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 51, categoryId: 7, name: "Camera", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 52, categoryId: 7, name: "Paintbrush", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 53, categoryId: 7, name: "Piano", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 54, categoryId: 7, name: "Smile", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 55, categoryId: 7, name: "BookOpen", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 56, categoryId: 7, name: "Pencil", sortOrder: 8, isActive: true }),

      // 健康・美容系アイコン (categoryId: 8)
      Object.assign(new IconEntity(), { id: 57, categoryId: 8, name: "UserCheck", sortOrder: 1, isActive: true }),
      Object.assign(new IconEntity(), { id: 58, categoryId: 8, name: "Activity", sortOrder: 2, isActive: true }),
      Object.assign(new IconEntity(), { id: 59, categoryId: 8, name: "Bandage", sortOrder: 3, isActive: true }),
      Object.assign(new IconEntity(), { id: 60, categoryId: 8, name: "Droplet", sortOrder: 4, isActive: true }),
      Object.assign(new IconEntity(), { id: 61, categoryId: 8, name: "Scissors", sortOrder: 5, isActive: true }),
      Object.assign(new IconEntity(), { id: 62, categoryId: 8, name: "Paintbrush2", sortOrder: 6, isActive: true }),
      Object.assign(new IconEntity(), { id: 63, categoryId: 8, name: "Shield", sortOrder: 7, isActive: true }),
      Object.assign(new IconEntity(), { id: 64, categoryId: 8, name: "Scale3D", sortOrder: 8, isActive: true }),
    ];
  }
}
