import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { SharedQuestEntity } from "./sharedQuestEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";

/**
 * 保存されたクエストエンティティ
 * 
 * 家族が保存した共有クエストの情報を管理するエンティティです。
 */
@Entity("saved_quests")
@Unique("uq_saved_quests", ["sharedQuestId", "savedBy"])
export class SavedQuestEntity extends BaseTransactionEntity {
  @Column({ name: "shared_quest_id", type: "int", nullable: false, comment: "クエストID(外部キー)" })
  sharedQuestId!: number;
  @Column({ name: "saved_by", type: "int", nullable: false, comment: "保存した家族ID" })
  savedBy!: number;

  @ManyToOne(() => SharedQuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_saved_quests_shared_quest_id" })
  sharedQuest!: SharedQuestEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "saved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_saved_quests_saved_by" })
  family!: FamilyEntity;
}
