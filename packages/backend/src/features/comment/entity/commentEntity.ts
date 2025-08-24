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
  @Column({ name: "commented_by", type: "int", nullable: false, comment: "コメント投稿者ID" })
  commentedBy!: number;
  @Column({ name: "commentable_type", type: "int", nullable: false, comment: "コメント対象タイプID" })
  commentableType!: number;
  @Column({ name: "parent_comment_id", type: "int", nullable: true, comment: "親コメントID" })
  parentCommentId?: number;
  @Column({ name: "body", type: "text", nullable: false, comment: "コメント本文" })
  body!: string;
  @Column({ name: "commented_at", type: "timestamp with time zone", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "コメント投稿日時" })
  commentedAt!: Date;

  @ManyToOne(() => FamilyMemberEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "commented_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_commented_by" })
  familyMember!: FamilyMemberEntity;
  @ManyToOne(() => CommentEntity, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_parent_comment_id" })
  parentComment?: CommentEntity;
  @ManyToOne(() => CommentableTypeEntity, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "commentable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_commentable_type" })
  commentableTypeRef!: CommentableTypeEntity;

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
  @Column({ name: "commented_by", type: "int" })
  commentedBy!: number;
  @Column({ name: "commentable_type", type: "int" })
  commentableType!: number;
  @Column({ name: "parent_comment_id", type: "int", nullable: true })
  parentCommentId?: number;
  @Column({ name: "body", type: "text" })
  body!: string;
  @Column({ name: "commented_at", type: "timestamp with time zone" })
  commentedAt!: Date;

  /**
   * サブクラス固有の属性をセット
   */
  protected static setSpecificAttrs(instance: CommentHistoryEntity, source: CommentEntity): void {
    instance.commentedBy = source.commentedBy;
    instance.commentableType = source.commentableType;
    instance.parentCommentId = source.parentCommentId;
    instance.body = source.body;
    instance.commentedAt = source.commentedAt;
  }
}

/**
 * コメント翻訳エンティティ
 */
@Entity("comments_translation")
@Check("chk_comments_translation_body_not_empty", "LENGTH(body) > 0")
@Unique("uq_comments_translation_comment_language", ["commentId", "languageId"])
export class CommentTranslationEntity extends BaseTransactionTranslationEntity {
  @Column({ name: "comment_id", type: "int", nullable: false, comment: "コメントID" })
  commentId!: number;
  @Column({ name: "body", type: "text", nullable: false, comment: "コメント本文の翻訳" })
  body!: string;

  @ManyToOne(() => CommentEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_comment_translation_comment_id" })
  comment!: CommentEntity;

  /**
   * 翻訳元レコードのIDを返す
   */
  get sourceId(): number {
    return this.commentId;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): CommentTranslationEntity[] {
    return [];
  }
}
