import {
  Entity,
  Column,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * クエストタイプエンティティ
 */
@Entity("quest_types")
export class QuestTypeEntity extends AppBaseEntity {
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "タイプコード" })
  code!: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "タイプの説明" })
  description!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): QuestTypeEntity[] {
    return [
      Object.assign(new QuestTypeEntity(), {
        code: "daily",
        description: "日常的なタスク"
      }),
      Object.assign(new QuestTypeEntity(), {
        code: "weekly",
        description: "週次のタスク"
      }),
      Object.assign(new QuestTypeEntity(), {
        code: "monthly",
        description: "月次のタスク"
      }),
      Object.assign(new QuestTypeEntity(), {
        code: "one_time",
        description: "一回限りのタスク"
      }),
      Object.assign(new QuestTypeEntity(), {
        code: "project",
        description: "プロジェクト系タスク"
      }),
    ];
  }
}
