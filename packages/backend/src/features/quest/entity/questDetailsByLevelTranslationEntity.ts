import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestDetailsByLevelEntity } from "./questDetailsByLevelEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("quest_details_by_level_translation")
@Unique("uq_quest_details_by_level_translation_detail_language", ["quest_detail_id", "language_id"])
export class QuestDetailsByLevelTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエスト詳細ID" })
  quest_detail_id!: number;

  @Column({ type: "text", nullable: false, comment: "詳細説明の翻訳" })
  description!: string;

  @Column({ type: "text", nullable: true, comment: "完了条件の翻訳" })
  completion_criteria?: string;

  @Column({ type: "text", nullable: true, comment: "ヒントの翻訳" })
  hints?: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => QuestDetailsByLevelEntity)
  @JoinColumn({ name: "quest_detail_id" })
  questDetail?: QuestDetailsByLevelEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestDetailsByLevelTranslationEntity[] {
    return [
      Object.assign(new QuestDetailsByLevelTranslationEntity(), { 
        quest_detail_id: 1, 
        language_id: 1, 
        description: "レベル1：ベッドを整えて、机の上を片付けよう", 
        completion_criteria: "ベッドメイキング完了、机の上に物がない状態",
        hints: "まずはベッドから始めてみよう"
      }),
      Object.assign(new QuestDetailsByLevelTranslationEntity(), { 
        quest_detail_id: 1, 
        language_id: 2, 
        description: "Level 1: Make your bed and clean up your desk", 
        completion_criteria: "Bed making completed, desk surface clear",
        hints: "Start with making your bed first"
      }),
      Object.assign(new QuestDetailsByLevelTranslationEntity(), { 
        quest_detail_id: 2, 
        language_id: 1, 
        description: "レベル2：床に落ちているものを片付けて、掃除機をかけよう", 
        completion_criteria: "床がきれいになり、掃除機がかけられている",
        hints: "まず物を拾ってから掃除機をかけてね"
      }),
      Object.assign(new QuestDetailsByLevelTranslationEntity(), { 
        quest_detail_id: 2, 
        language_id: 2, 
        description: "Level 2: Pick up items from floor and vacuum", 
        completion_criteria: "Floor is clean and vacuumed",
        hints: "Pick up items first, then vacuum"
      }),
    ];
  }
}
