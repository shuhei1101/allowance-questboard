import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseTransactionTranslationEntity } from "@backend/core/entity/baseTransactionTranslationEntity";
import { CurrencyEntity } from "@backend/features/shared/entity/currencyEntity";
import { QuestEntity } from "./questEntity";

/**
 * クエスト詳細(レベル別)エンティティ
 */
@Entity("quest_detail_by_level")
@Unique("uq_quest_detail_by_level_quest_level", ["quest_id", "level"])
@Check("chk_quest_detail_by_level_level_positive", "level > 0")
@Check("chk_quest_detail_by_level_success_criteria_not_empty", "length(success_criteria) > 0")
@Check("chk_quest_detail_by_level_target_count_positive", "target_count > 0")
@Check("chk_quest_detail_by_level_reward_non_negative", "reward >= 0")
@Check("chk_quest_detail_by_level_child_exp_non_negative", "child_exp >= 0")
@Check("chk_quest_detail_by_level_quest_exp_non_negative", "quest_exp >= 0")
export class QuestDetailByLevelEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;
  @Column({ type: "int", nullable: false, comment: "レベル" })
  level!: number;
  @Column({ type: "text", nullable: false, comment: "成功条件" })
  success_criteria!: string;
  @Column({ type: "int", nullable: false, comment: "目標回数" })
  target_count!: number;
  @Column({ type: "int", nullable: false, comment: "報酬金額" })
  reward!: number;
  @Column({ type: "int", nullable: false, comment: "通貨ID" })
  currency_id!: number;
  @Column({ type: "int", nullable: false, comment: "子供獲得経験値" })
  child_exp!: number;
  @Column({ type: "int", nullable: false, comment: "クエスト獲得経験値" })
  quest_exp!: number;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_detail_by_level_quest_id" })
  quest!: QuestEntity;
  @ManyToOne(() => CurrencyEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "currency_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_quest_detail_by_level_currency_id" })
  currency!: CurrencyEntity;
}

/**
 * クエスト詳細翻訳エンティティ
 */
@Entity("quest_detail_by_level_translation")
@Unique("uq_quest_detail_by_level_translation_detail_language", ["quest_detail_by_level_id", "language_id"])
export class QuestDetailByLevelTranslationEntity extends BaseTransactionTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "クエスト詳細ID" })
  quest_detail_by_level_id!: number;
  @Column({ type: "text", nullable: false, comment: "成功条件の翻訳" })
  success_criteria!: string;

  @ManyToOne(() => QuestDetailByLevelEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ 
    name: "quest_detail_by_level_id", 
    referencedColumnName: "id", 
    foreignKeyConstraintName: "fk_quest_detail_translation_detail_id" 
  })
  quest_detail_by_level!: QuestDetailByLevelEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.quest_detail_by_level_id;
  }
}
