import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { AppBaseEntity } from "@backend/core/entity/appBaseEntity";
import { BaseHistoryEntity } from "@backend/core/entity/baseHistoryEntity";
import { FamilyMember } from "@backend/features/family-member/entity/familyMember";

/**
 * コメントエンティティ
 */
@Entity("comments")
@Check("chk_comments_body_not_empty", "length(body) > 0")
export class Comment extends AppBaseEntity {
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

  @ManyToOne(() => FamilyMember, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "commented_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_comments_commented_by" })
  family_member!: FamilyMember;

  // CommentableTypesとのリレーションは後で追加予定
  // @ManyToOne(() => CommentableType, { nullable: false, onDelete: "RESTRICT" })
  // @JoinColumn({ name: "commentable_type", referencedColumnName: "id", foreignKeyConstraintName: "fk_comments_commentable_type" })
  // commentable_type_ref!: CommentableType;

  @ManyToOne(() => Comment, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_comments_parent_comment_id" })
  parent_comment?: Comment;

  /**
   * シード用データ取得
   */
  protected static seedData(): Comment[] {
    // コメントは動的に作成されるためシードデータなし
    return [];
  }
}

/**
 * コメント履歴エンティティ
 */
@Entity("comments_history")
export class CommentHistory extends BaseHistoryEntity<Comment> {
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
  protected static setSpecificAttrs(instance: CommentHistory, source: Comment): void {
    instance.commented_by = source.commented_by;
    instance.commentable_type = source.commentable_type;
    instance.parent_comment_id = source.parent_comment_id;
    instance.body = source.body;
    instance.commented_at = source.commented_at;
  }

  /**
   * シード用データ取得
   */
  protected static seedData(): CommentHistory[] {
    return [];
  }
}
