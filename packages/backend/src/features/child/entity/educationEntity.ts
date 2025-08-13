import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryColumn,
} from "typeorm";
import { BaseMasterEntity } from "src/core/entity/baseMasterEntity";
import { BaseMasterTranslationEntity } from "src/core/entity/baseTranslationEntity";

/**
 * 学歴マスタエンティティ
 */
@Entity("educations")
export class EducationEntity extends BaseMasterEntity {
  @PrimaryColumn({ type: "int", comment: "ID" })
  id!: number;
  @Column({ type: "varchar", length: 20, nullable: false, unique: true, comment: "学歴コード" })
  code!: string;

  /**
   * シード用データ取得
   */
  protected static seedData(): EducationEntity[] {
    return [
      Object.assign(new EducationEntity(), { id: 1, code: "elementary" }),
      Object.assign(new EducationEntity(), { id: 2, code: "junior_high" }),
      Object.assign(new EducationEntity(), { id: 3, code: "high_school" }),
      Object.assign(new EducationEntity(), { id: 4, code: "university" }),
      Object.assign(new EducationEntity(), { id: 5, code: "graduate_school" }),
    ];
  }
}

/**
 * 学歴翻訳エンティティ
 */
@Entity("educations_translation")
@Unique("uq_educations_translation_education_language", ["education_id", "language_id"])
export class EducationTranslationEntity extends BaseMasterTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "学歴ID(外部キー)" })
  education_id!: number;
  @Column({ type: "varchar", length: 100, nullable: false, comment: "学歴名の翻訳" })
  name!: string;

  @ManyToOne(() => EducationEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "education_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_education_translation_education_id" })
  education!: EducationEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.education_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): EducationTranslationEntity[] {
    return [
      Object.assign(new EducationTranslationEntity(), { education_id: 1, language_id: 1, name: "小学校" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 1, language_id: 2, name: "Elementary School" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 2, language_id: 1, name: "中学校" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 2, language_id: 2, name: "Junior High School" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 3, language_id: 1, name: "高等学校" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 3, language_id: 2, name: "High School" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 4, language_id: 1, name: "大学" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 4, language_id: 2, name: "University" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 5, language_id: 1, name: "大学院" }),
      Object.assign(new EducationTranslationEntity(), { education_id: 5, language_id: 2, name: "Graduate School" }),
    ];
  }
}
