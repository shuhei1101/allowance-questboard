import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { CommentEntity } from "./commentEntity";
import { LanguageEntity } from "../../language/entity/languageEntity";

@Entity("comments_translation")
@Unique("uq_comments_translation_comment_language", ["comment_id", "language_id"])
export class CommentTranslationEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "言語ID" })
  language_id!: number;

  @Column({ type: "int", nullable: false, comment: "コメントID" })
  comment_id!: number;

  @Column({ type: "text", nullable: false, comment: "コメント内容の翻訳" })
  content!: string;

  // Relations
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: "language_id" })
  language?: LanguageEntity;

  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: "comment_id" })
  comment?: CommentEntity;

  /**
   * シードデータ
   */
  protected static seedData(): CommentTranslationEntity[] {
    return [
      Object.assign(new CommentTranslationEntity(), { 
        comment_id: 1, 
        language_id: 1, 
        content: "お疲れ様！とてもよくできました。" 
      }),
      Object.assign(new CommentTranslationEntity(), { 
        comment_id: 1, 
        language_id: 2, 
        content: "Great job! You did very well." 
      }),
      Object.assign(new CommentTranslationEntity(), { 
        comment_id: 2, 
        language_id: 1, 
        content: "次回も頑張ってください！" 
      }),
      Object.assign(new CommentTranslationEntity(), { 
        comment_id: 2, 
        language_id: 2, 
        content: "Please keep up the good work next time!" 
      }),
    ];
  }
}
