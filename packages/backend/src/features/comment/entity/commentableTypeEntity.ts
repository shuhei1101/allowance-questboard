import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";

@Entity("commentable_types")
export class CommentableTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true, comment: "コメントが可能なテーブル名" })
  table_name!: string;

  @Column({ type: "text", nullable: false, comment: "コメント対象タイプの説明" })
  description!: string;

  /**
   * シードデータ
   */
  protected static seedData(): CommentableTypeEntity[] {
    return [
      Object.assign(new CommentableTypeEntity(), { table_name: "quests", description: "クエストに対するコメント" }),
    ];
  }
}
