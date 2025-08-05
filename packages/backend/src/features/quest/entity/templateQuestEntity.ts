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
  @Column({ type: "int", nullable: false, unique: true, comment: "クエストID(外部キー、一意制約)" })
  quest_id!: number;

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
      { quest_id: 1 },
      { quest_id: 2 },
      { quest_id: 3 },
    ];
  }
}
