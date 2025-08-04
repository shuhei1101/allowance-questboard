import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";

/**
 * クエスト経験値(レベル別)エンティティ
 */
@Entity("quest_exp_by_level")
@Unique("uq_quest_exp_by_level_quest_level", ["quest_id", "level"])
@Check("chk_quest_exp_by_level_level_positive", "level > 0")
@Check("chk_quest_exp_by_level_exp_non_negative", "exp >= 0")
export class QuestExpByLevelEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;

  @Column({ type: "int", nullable: false, comment: "レベル" })
  level!: number;

  @Column({ type: "int", nullable: false, comment: "必要経験値" })
  exp!: number;

  // TODO: QuestsEntity作成後にリレーション追加
  // @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_exp_by_level_quest_id" })
  // quest!: QuestEntity;
}
