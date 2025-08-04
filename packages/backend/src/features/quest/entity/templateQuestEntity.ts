import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestEntity } from "./questEntity";
import { TemplateQuestCategoryEntity } from "./templateQuestCategoryEntity";

/**
 * テンプレートクエストエンティティ
 */
@Entity("template_quests")
export class TemplateQuestEntity extends AppBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "int", nullable: false, unique: true, comment: "クエストID(外部キー、一意制約)" })
  quest_id!: number;

  @Column({ type: "int", nullable: false, comment: "難易度レベル" })
  difficulty_level!: number;

  @Column({ type: "int", nullable: false, comment: "テンプレートカテゴリID" })
  template_category_id!: number;

  @Column({ type: "boolean", nullable: false, default: true, comment: "有効フラグ" })
  is_active!: boolean;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_template_quests_quest_id" })
  quest!: QuestEntity;

  @ManyToOne(() => TemplateQuestCategoryEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "template_category_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_template_quests_template_category_id" })
  template_category!: TemplateQuestCategoryEntity;

  /**
   * シードデータ
   */
  static getSeedData(): Partial<TemplateQuestEntity>[] {
    return [
      {
        quest_id: 1,
        difficulty_level: 1,
        template_category_id: 1,
        is_active: true,
      },
      {
        quest_id: 2,
        difficulty_level: 2,
        template_category_id: 2,
        is_active: true,
      },
      {
        quest_id: 3,
        difficulty_level: 1,
        template_category_id: 3,
        is_active: true,
      },
    ];
  }
}
