import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";

@Entity("commentable_types")
export class CommentableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "コメント対象テーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "コメント対象タイプの説明" })
  description!: string;

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  /**
   * シードデータ
   */
  protected static seedData(): CommentableTypeEntity[] {
    return [
      Object.assign(new CommentableTypeEntity(), { 
        table_name: "quests", 
        description: "クエストに対するコメント",
        is_active: true
      }),
      Object.assign(new CommentableTypeEntity(), { 
        table_name: "reports", 
        description: "レポートに対するコメント",
        is_active: true
      }),
      Object.assign(new CommentableTypeEntity(), { 
        table_name: "allowance_records", 
        description: "お小遣い記録に対するコメント",
        is_active: true
      }),
      Object.assign(new CommentableTypeEntity(), { 
        table_name: "family_members", 
        description: "家族メンバーに対するコメント",
        is_active: true
      }),
    ];
  }
}
