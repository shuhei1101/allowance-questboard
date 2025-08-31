import { BaseDomainModel } from "@backend/core/models/baseDomainModel";
import { FamilyId } from "../value-object/familyId";
import { InviteCode } from "../value-object/inviteCode";
import { FamilyInviteId } from "../value-object/familyInviteId";

/**
 * 家族招待ドメインモデル
 */
export class FamilyInvite extends BaseDomainModel<FamilyInviteId> {
  public readonly familyId: FamilyId;
  public readonly inviteCode: InviteCode;
  public readonly expiresAt: Date;
  public readonly isUsed: boolean;

  constructor(params: {
    id?: FamilyInviteId;
    familyId: FamilyId;
    inviteCode: InviteCode;
    expiresAt: Date;
    isUsed?: boolean;
  }) {
    super(params.id);
    this.familyId = params.familyId;
    this.inviteCode = params.inviteCode;
    this.expiresAt = params.expiresAt;
    this.isUsed = params.isUsed ?? false;
  }

  /**
   * 招待が期限切れかどうかを判定
   */
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * 招待が利用可能かどうかを判定（未使用かつ有効期限内）
   */
  isAvailable(): boolean {
    return !this.isUsed && !this.isExpired();
  }

  /**
   * 招待を使用済みにマークした新しいインスタンスを返す
   */
  markAsUsed(): FamilyInvite {
    return new FamilyInvite({
      id: this.id,
      familyId: this.familyId,
      inviteCode: this.inviteCode,
      expiresAt: this.expiresAt,
      isUsed: true,
    });
  }

  /**
   * 新しい招待を作成（7日後に期限切れ）
   */
  static createNew(params: {
    familyId: FamilyId;
  }): FamilyInvite {
    const inviteCode = InviteCode.generate();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7日後

    return new FamilyInvite({
      familyId: params.familyId,
      inviteCode,
      expiresAt,
      isUsed: false,
    });
  }

  /**
   * ドメインモデルの検証
   */
  protected validate(): void {
    // 必要に応じてビジネスルールの検証を実装
    // 例：有効期限が過去でないか、メールアドレスとトークンが有効かなど
  }
}
