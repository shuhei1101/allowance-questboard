import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { CommentEntity } from "./commentEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";

/**
 * コメントいいねエンティティ
 */
@Entity("comment_likes")
@Unique("uq_comment_likes_comment_member", ["commentId", "familyMemberId"])
export class CommentLikeEntity extends BaseTransactionEntity {
  @Column({ name: "comment_id", type: "int", nullable: false, comment: "コメントID" })
  commentId!: number;
  @Column({ name: "family_member_id", type: "int", nullable: false, comment: "家族メンバーID" })
  familyMemberId!: number;
  @Column({ name: "liked_at", type: "timestamp", nullable: true, comment: "いいね日時" })
  likedAt?: Date;

  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: "comment_id" })
  comment?: CommentEntity;
  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  /**
   * シードデータ
   */
  protected static seedData(): CommentLikeEntity[] {
    return [];
  }
}
