import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyEntity } from "./familyEntity";

@Entity("follows")
export class FollowEntity extends BaseTransactionEntity {
  @Column({ name: "follow_from", type: "int", nullable: false, comment: "フォロー元の家族メンバーID" })
  followFrom!: number;
  @Column({ name: "follow_to", type: "int", nullable: false, comment: "フォロー先の家族メンバーID" })
  followTo!: number;

  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "follow_from", referencedColumnName: "id", foreignKeyConstraintName: "fk_follows_follow_from" })
  follower?: FamilyEntity;
  @ManyToOne(() => FamilyEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "follow_to", referencedColumnName: "id", foreignKeyConstraintName: "fk_follows_follow_to" })
  followee?: FamilyEntity;
}
