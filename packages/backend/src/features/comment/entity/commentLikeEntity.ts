import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { CommentEntity } from "./commentEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";

/**
 * コメントいいねエンティティ
 */
@Entity("comment_likes")
@Unique("uq_comment_likes_comment_member", ["comment_id", "family_member_id"])
export class CommentLikeEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "コメントID" })
  comment_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族メンバーID" })
  family_member_id!: number;
  @Column({ type: "datetime", nullable: true, comment: "いいね日時" })
  liked_at?: Date;

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
