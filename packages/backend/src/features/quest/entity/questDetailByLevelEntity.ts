import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { CurrencyEntity } from "@backend/features/shared/entity/currencyEntity";
import { QuestEntity } from "./questEntity";
import { BaseTransactionTranslationEntity } from "@backend/core/entity/baseTranslationEntity";

/**
 * クエスト詳細(レベル別)エンティティ
 */
@Entity("quest_detail_by_level")
@Unique("uq_quest_detail_by_level_quest_level", ["questId", "level"])
@Check("chk_quest_detail_by_level_level_positive", "level > 0")
@Check("chk_quest_detail_by_level_success_criteria_not_empty", "length(success_criteria) > 0")
@Check("chk_quest_detail_by_level_target_count_positive", "target_count > 0")
@Check("chk_quest_detail_by_level_reward_non_negative", "reward >= 0")
@Check("chk_quest_detail_by_level_child_exp_non_negative", "child_exp >= 0")
@Check("chk_quest_detail_by_level_quest_exp_non_negative", "quest_exp >= 0")
export class QuestDetailByLevelEntity extends BaseTransactionEntity {
  @Column({ name: "quest_id", type: "int", nullable: false, comment: "クエストID" })
  questId!: number;
  @Column({ name: "level", type: "int", nullable: false, comment: "レベル" })
  level!: number;
  @Column({ name: "success_criteria", type: "text", nullable: false, comment: "成功条件" })
  successCriteria!: string;
  @Column({ name: "target_count", type: "int", nullable: false, comment: "報酬獲得までの目標達成回数" })
  targetCount!: number;
  @Column({ name: "reward", type: "int", nullable: false, comment: "報酬金額" })
  reward!: number;
  @Column({ name: "currency_id", type: "int", nullable: false, comment: "通貨ID" })
  currencyId!: number;
  @Column({ name: "child_exp", type: "int", nullable: false, comment: "子供獲得経験値" })
  childExp!: number;
  @Column({ name: "quest_exp", type: "int", nullable: false, comment: "クエスト獲得経験値" })
  questExp!: number;
  @Column({ name: "required_exp", type: "int", nullable: false, comment: "レベル解放に必要なクエスト経験値" })
  requiredExp!: number;

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
@Unique("uq_quest_detail_by_level_translation_detail_language", ["questDetailByLevelId", "languageId"])
export class QuestDetailByLevelTranslationEntity extends BaseTransactionTranslationEntity {
  @Column({ name: "quest_detail_by_level_id", type: "int", nullable: false, comment: "クエスト詳細ID" })
  questDetailByLevelId!: number;
  @Column({ name: "success_criteria", type: "text", nullable: false, comment: "成功条件の翻訳" })
  successCriteria!: string;

  @ManyToOne(() => QuestDetailByLevelEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ 
    name: "quest_detail_by_level_id", 
    referencedColumnName: "id", 
    foreignKeyConstraintName: "fk_quest_detail_translation_detail_id" 
  })
  questDetailByLevel!: QuestDetailByLevelEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.questDetailByLevelId;
  }
}
