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

@Entity("comment_likes")
@Unique("uq_comment_likes_comment_member", ["comment_id", "family_member_id"])
export class CommentLikeEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "コメントID" })
  comment_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "boolean", nullable: false, default: true, comment: "いいねフラグ" })
  is_liked!: boolean;

  @Column({ type: "datetime", nullable: true, comment: "いいね日時" })
  liked_at?: Date;

  // Relations
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
    return [
      Object.assign(new CommentLikeEntity(), { 
        comment_id: 1, 
        family_member_id: 2, 
        is_liked: true,
        liked_at: new Date("2024-01-01T12:00:00Z")
      }),
      Object.assign(new CommentLikeEntity(), { 
        comment_id: 1, 
        family_member_id: 3, 
        is_liked: true,
        liked_at: new Date("2024-01-01T12:30:00Z")
      }),
      Object.assign(new CommentLikeEntity(), { 
        comment_id: 2, 
        family_member_id: 1, 
        is_liked: true,
        liked_at: new Date("2024-01-01T13:00:00Z")
      }),
    ];
  }
}
