import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { QuestEntity } from "./questEntity";
import { FamilyQuestEntity } from "./familyQuestEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";
import { CommentEntity } from "../../comment/entity/commentEntity";

/**
 * 共有クエストエンティティ
 */
@Entity("shared_quests")
export class SharedQuestEntity extends BaseTransactionEntity {
  @Column({ name: "quest_id", type: "int", nullable: false, comment: "クエストID" })
  questId!: number;
  @Column({ name: "source_family_quest_id", type: "int", nullable: false, comment: "共有元の家族クエストID" })
  sourceFamilyQuestId!: number;
  @Column({ name: "shared_by", type: "int", nullable: false, comment: "共有元の家族ID" })
  sharedBy!: number;
  @Column({ name: "pinned_comment_id", type: "int", nullable: true, comment: "ピン留めコメントID" })
  pinnedCommentId?: number;
  @Column({ name: "is_shared", type: "boolean", nullable: false, default: false, comment: "共有フラグ" })
  isShared!: boolean;
  @Column({ name: "shared_at", type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "共有日時" })
  sharedAt!: Date;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_quest_id" })
  quest!: QuestEntity;
  @ManyToOne(() => FamilyQuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "source_family_quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_source_family_quest_id" })
  sourceFamilyQuest!: FamilyQuestEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_shared_by" })
  family!: FamilyEntity;
  @ManyToOne(() => CommentEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "pinned_comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_pinned_comment_id" })
  pinnedComment?: CommentEntity;
}
