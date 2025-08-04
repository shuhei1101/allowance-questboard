import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  DataSource,
} from "typeorm";
import { BaseHistoryEntity } from "../../../core/entity/baseHistoryEntity";
import { CommentEntity } from "./commentEntity";
import { FamilyMemberEntity } from "../../family-member/entity/familyMemberEntity";

@Entity("comments_history")
export class CommentHistoryEntity extends BaseHistoryEntity {
  @Column({ type: "int", nullable: false, comment: "元テーブルのレコードID" })
  original_id!: number;

  @Column({ type: "int", nullable: false, comment: "ファミリーメンバーID" })
  family_member_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false, comment: "関連テーブル名" })
  related_table!: string;

  @Column({ type: "int", nullable: false, comment: "関連レコードID" })
  related_id!: number;

  @Column({ type: "text", nullable: false, comment: "コメント内容" })
  content!: string;

  @Column({ type: "int", nullable: true, comment: "親コメントID" })
  parent_comment_id?: number;

  // Relations
  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: "original_id" })
  comment?: CommentEntity;

  @ManyToOne(() => FamilyMemberEntity)
  @JoinColumn({ name: "family_member_id" })
  familyMember?: FamilyMemberEntity;

  @ManyToOne(() => CommentEntity)
  @JoinColumn({ name: "parent_comment_id" })
  parentComment?: CommentEntity;

  /**
   * シードデータ
   */
  protected static seedData(): CommentHistoryEntity[] {
    return [
      Object.assign(new CommentHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        related_table: "quests",
        related_id: 1,
        content: "頑張りました！",
      }),
      Object.assign(new CommentHistoryEntity(), {
        original_id: 1,
        family_member_id: 1,
        related_table: "quests",
        related_id: 1,
        content: "本当に頑張りました！",
      }),
    ];
  }
}
