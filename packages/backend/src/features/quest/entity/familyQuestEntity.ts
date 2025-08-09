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

/**
 * 家族クエストエンティティ
 */
@Entity("family_quests")
@Unique("uq_family_quests", ["family_id", "quest_id"])
export class FamilyQuestEntity extends BaseTransactionEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  declare id: number;  // BaseTransactionEntityのidを再宣言（既に@PrimaryGeneratedColumnが定義されているため）

  @Column({ type: "int", nullable: false, comment: "クエストID" })
  quest_id!: number;
  @Column({ type: "int", nullable: false, comment: "家族ID" })
  family_id!: number;
  @Column({ type: "boolean", nullable: false, default: false, comment: "公開フラグ" })
  is_public!: boolean;

  @ManyToOne(() => QuestEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "quest_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_quests_quest_id" })
  quest!: QuestEntity;
  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_quests_family_id" })
  family!: FamilyEntity;
}
