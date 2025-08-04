import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestEntity } from "./questEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("quests_translation")
@Unique("uq_quests_translation_quest_language", ["quest_id", "language_id"])
export class QuestTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "クエスト名の翻訳" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "クエスト説明の翻訳" })
  description?: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => QuestEntity)
  @JoinColumn({ name: "quest_id" })
  quest?: QuestEntity;

  /**
   * シードデータ
   */
  protected static seedData(): QuestTranslationEntity[] {
    return [
      Object.assign(new QuestTranslationEntity(), { 
        quest_id: 1, 
        language_id: 1, 
        name: "部屋の掃除", 
        description: "自分の部屋をきれいに掃除しよう" 
      }),
      Object.assign(new QuestTranslationEntity(), { 
        quest_id: 1, 
        language_id: 2, 
        name: "Clean Room", 
        description: "Clean your room nicely" 
      }),
      Object.assign(new QuestTranslationEntity(), { 
        quest_id: 2, 
        language_id: 1, 
        name: "宿題", 
        description: "学校の宿題を終わらせよう" 
      }),
      Object.assign(new QuestTranslationEntity(), { 
        quest_id: 2, 
        language_id: 2, 
        name: "Homework", 
        description: "Finish your school homework" 
      }),
    ];
  }
}
