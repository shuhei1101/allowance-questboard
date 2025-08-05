import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { AppBaseEntity } from "../../../core/entity/appBaseEntity";
import { SharedQuestEntity } from "./sharedQuestEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";

/**
 * 保存されたクエストエンティティ
 * 
 * 家族が保存した共有クエストの情報を管理するエンティティです。
 */
@Entity("saved_quests")
@Unique("uq_saved_quests", ["shared_quest_id", "saved_by"])
export class SavedQuestEntity extends AppBaseEntity {
  @Column({ type: "int", nullable: false, comment: "クエストID(外部キー)" })
  shared_quest_id!: number;
  @Column({ type: "int", nullable: false, comment: "保存した家族ID" })
  saved_by!: number;

  @ManyToOne(() => SharedQuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "shared_quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_saved_quests_shared_quest_id" })
  shared_quest!: SharedQuestEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "saved_by", referencedColumnName: "id", foreignKeyConstraintName: "fk_saved_quests_saved_by" })
  family!: FamilyEntity;
}
