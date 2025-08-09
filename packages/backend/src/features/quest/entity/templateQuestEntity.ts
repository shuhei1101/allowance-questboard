import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "../../../core/entity/baseMasterEntity";
import { QuestEntity } from "./questEntity";

/**
 * テンプレートクエストエンティティ
 */
@Entity("template_quests")
export class TemplateQuestEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "int", nullable: false, unique: true, comment: "クエストID(外部キー、一意制約)" })
  quest_id!: number;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_template_quests_quest_id" })
  quest!: QuestEntity;

  /**
   * シードデータ
   */
  protected static seedData(): TemplateQuestEntity[] {
    return [
      Object.assign(new TemplateQuestEntity(), { id: 1, quest_id: 1, template_category_id: 1 }),
      Object.assign(new TemplateQuestEntity(), { id: 2, quest_id: 2, template_category_id: 2 }),
      Object.assign(new TemplateQuestEntity(), { id: 3, quest_id: 3, template_category_id: 3 }),
    ];
  }
}
