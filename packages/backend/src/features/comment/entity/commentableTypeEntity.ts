import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "../../../core/entity/baseMasterEntity";

@Entity("commentable_types")
export class CommentableTypeEntity extends BaseMasterEntity {
  @PrimaryColumn({ name: "id", type: "int", comment: "ID" })
  id!: number;
  @Column({ name: "table_name", type: "varchar", length: 50, nullable: false, unique: true, comment: "コメントが可能なテーブル名" })
  tableName!: string;

  @Column({ name: "description", type: "text", nullable: false, comment: "コメント対象タイプの説明" })
  description!: string;

  /**
   * シードデータ
   */
  protected static seedData(): CommentableTypeEntity[] {
    return [
      Object.assign(new CommentableTypeEntity(), { id: 1, tableName: "quests", description: "クエストに対するコメント" }),
    ];
  }
}
