import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { QuestEntity } from "./questEntity";

/**
 * クエスト経験値(レベル別)エンティティ
 */
@Entity("quest_exp_by_level")
@Unique("uq_quest_exp_by_level_quest_level", ["questId", "level"])
@Check("chk_quest_exp_by_level_level_positive", "level > 0")
@Check("chk_quest_exp_by_level_exp_non_negative", "exp >= 0")
export class QuestExpByLevelEntity extends BaseTransactionEntity {
  @Column({ name: "quest_id", type: "int", nullable: false, comment: "クエストID" })
  questId!: number;
  @Column({ name: "level", type: "int", nullable: false, comment: "レベル" })
  level!: number;
  @Column({ name: "exp", type: "int", nullable: false, comment: "必要経験値" })
  exp!: number;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_exp_by_level_quest_id" })
  quest!: QuestEntity;
}
