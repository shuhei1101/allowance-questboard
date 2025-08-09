import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { BaseTransactionTranslationEntity } from "@backend/core/entity/baseTranslationEntity";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { CommentableTypeEntity } from "./commentableTypeEntity";

/**
 * コメントエンティティ
 */
@Entity("comments")
@Check("chk_comments_body_not_empty", "LENGTH(body) > 0")
export class CommentEntity extends BaseTransactionEntity {
  @Column({ type: "int", nullable: false, comment: "コメント投稿者ID" })
  commented_by!: number;
  @Column({ type: "int", nullable: false, comment: "コメント対象タイプID" })
  commentable_type!: number;
  @Column({ type: "int", nullable: true, comment: "親コメントID" })
  parent_comment_id?: number;
  @Column({ type: "text", nullable: false, comment: "コメント本文" })
  body!: string;
  @Column({ type: "timestamp with time zone", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "コメント投稿日時" })
  commented_at!: Date;

  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "commented_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_commented_by" })
  family_member!: FamilyMemberEntity;
  @ManyToOne(() => CommentEntity, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_parent_comment_id" })
  parent_comment?: CommentEntity;
  @ManyToOne(() => CommentableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "commentable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_commentable_type" })
  commentable_type_ref!: CommentableTypeEntity;

  /**
   * シード用データ取得
   */
  protected static seedData(): CommentEntity[] {
    return [];
  }
}

/**
 * コメント履歴エンティティ
 */
@Entity("comments_history")
export class CommentHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int" })
  commented_by!: number;
  @Column({ type: "int" })
  commentable_type!: number;
  @Column({ type: "int", nullable: true })
  parent_comment_id?: number;
  @Column({ type: "text" })
  body!: string;
  @Column({ type: "timestamp with time zone" })
  commented_at!: Date;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: CommentHistoryEntity, source: CommentEntity): void {
    instance.commented_by = source.commented_by;
    instance.commentable_type = source.commentable_type;
    instance.parent_comment_id = source.parent_comment_id;
    instance.body = source.body;
    instance.commented_at = source.commented_at;
  }
}

/**
 * コメント翻訳エンティティ
 */
@Entity("comments_translation")
@Check("chk_comments_translation_body_not_empty", "LENGTH(body) > 0")
@Unique("uq_comments_translation_comment_language", ["comment_id", "language_id"])
export class CommentTranslationEntity extends BaseTransactionTranslationEntity {
  @Column({ type: "int", nullable: false, comment: "コメントID" })
  comment_id!: number;
  @Column({ type: "text", nullable: false, comment: "コメント本文の翻訳" })
  body!: string;

  @ManyToOne(() => CommentEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_translation_comment_id" })
  comment!: CommentEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.comment_id;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): CommentTranslationEntity[] {
    return [];
  }
}
