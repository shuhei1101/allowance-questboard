import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { BaseTransactionEntity } from "@backend/core/entity/baseTransactionEntity";
import { FamilyEntity } from "./familyEntity";

/** 家族招待エンティティ */
@Entity("family_invites")
@Index("idx_family_invites_token", ["token"], { unique: true })
@Index("idx_family_invites_family_email", ["familyId", "email"])
@Index("idx_family_invites_expires_at", ["expiresAt"])
export class FamilyInviteEntity extends BaseTransactionEntity {
  @Column({ name: "family_id", type: "int", nullable: false, comment: "招待元の家族ID" })
  familyId!: number;
  @Column({ name: "email", type: "varchar", length: 254, nullable: false, comment: "招待対象メールアドレス" })
  email!: string;
  @Column({ name: "token", type: "varchar", length: 256, nullable: false, unique: true, comment: "招待トークン（64文字以上）" })
  token!: string;
  @Column({ name: "expires_at", type: "timestamptz", nullable: false, comment: "有効期限" })
  expiresAt!: Date;
  @Column({ name: "is_used", type: "boolean", nullable: false, default: false, comment: "使用済みフラグ" })
  isUsed!: boolean;

  @ManyToOne(() => FamilyEntity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "family_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_family_invites_family_id" })
  family!: FamilyEntity;

  /**
   * エンティティをRawデータから作成
   */
  static fromRaw(params: {
    id?: number;
    familyId: number;
    email: string;
    token: string;
    expiresAt: Date;
    isUsed?: boolean;
  }): FamilyInviteEntity {
    const entity = new FamilyInviteEntity();
    if (params.id !== undefined) entity.id = params.id;
    entity.familyId = params.familyId;
    entity.email = params.email;
    entity.token = params.token;
    entity.expiresAt = params.expiresAt;
    entity.isUsed = params.isUsed ?? false;
    return entity;
  }

  /** シード用データ取得 */
  protected static seedData(): FamilyInviteEntity[] {
    return [];
  }
}
