import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseTransactionEntity } from "../../../core/entity/baseTransactionEntity";
import { QuestEntity } from "./questEntity";
import { FamilyEntity } from "../../family/entity/familyEntity";

/** 家族クエストエンティティ */
@Entity("family_quests")
@Unique("uq_family_quests", ["familyId", "questId"])
export class FamilyQuestEntity extends BaseTransactionEntity {
  @Column({ name: "quest_id", type: "int", nullable: false, comment: "クエストID" })
  questId!: number;
  @Column({ name: "family_id", type: "int", nullable: false, comment: "家族ID" })
  familyId!: number;
  @Column({ name: "is_public", type: "boolean", nullable: false, default: false, comment: "公開フラグ" })
  isPublic!: boolean;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_quests_quest_id" })
  quest!: QuestEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_quests_family_id" })
  family!: FamilyEntity;
}
