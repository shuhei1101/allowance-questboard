import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  DataSource,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { EducationEntity } from "./educationEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("educations_translation")
@Unique("uq_educations_translation_education_language", ["education_id", "language_id"])
export class EducationTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "学歴ID" })
  education_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "学歴名の翻訳" })
  name!: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => EducationEntity)
  @JoinColumn({ name: "education_id" })
  education?: EducationEntity;

  /**
   * シードデータ
   */
  protected static seedData(): EducationTranslationEntity[] {
    return [
      Object.assign(new EducationTranslationEntity(), { education_id: 1, language_id: 1, name: "小学校" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 1, language_id: 2, name: "Elementary School" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 2, language_id: 1, name: "中学校" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 2, language_id: 2, name: "Middle School" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 3, language_id: 1, name: "高等学校" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 3, language_id: 2, name: "High School" }),
    ];
  }
}
