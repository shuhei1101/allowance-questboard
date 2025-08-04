import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { QuestEntity } from "./questEntity";
import { FamilyQuestEntity } from "./familyQuestEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";
import { CommentEntity } from "../../comment/entity/commentEntity";

/**
 * 共有クエストエンティティ
 */
@Entity("shared_quests")
export class SharedQuestEntity extends AppBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;

  @Column({ type: "int", nullable: false, comment: "ソース家族クエストID" })
  source_family_quest_id!: number;

  @Column({ type: "int", nullable: false, comment: "共有者の家族ID" })
  shared_by!: number;

  @Column({ type: "int", nullable: true, comment: "ピン留めコメントID" })
  pinned_comment_id!: number | null;

  @Column({ type: "boolean", nullable: false, default: false, comment: "共有フラグ" })
  is_shared!: boolean;

  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP", comment: "共有日時" })
  shared_at!: Date;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_quest_id" })
  quest!: QuestEntity;

  @ManyToOne(() => FamilyQuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "source_family_quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_source_family_quest_id" })
  source_family_quest!: FamilyQuestEntity;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_shared_by" })
  family!: FamilyEntity;

  @ManyToOne(() => CommentEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "pinned_comment_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_shared_quests_pinned_comment_id" })
  pinned_comment!: CommentEntity | null;
}
