import { BaseDomainModel } from "@backend/core/models/baseDomainModel";
import { FamilyId } from "../value-object/familyId";
import { Email } from "@backend/features/auth/value-object/email";
import { InviteToken } from "../value-object/inviteToken";
import { FamilyInviteId } from "../value-object/familyInviteId";

/**
 * 家族招待ドメインモデル
 */
export class FamilyInvite extends BaseDomainModel<FamilyInviteId> {
  public readonly familyId: FamilyId;
  public readonly email: Email;
  public readonly token: InviteToken;
  public readonly expiresAt: Date;
  public readonly isUsed: boolean;

  constructor(params: {
    id?: FamilyInviteId;
    familyId: FamilyId;
    email: Email;
    token: InviteToken;
    expiresAt: Date;
    isUsed?: boolean;
  }) {
    super(params.id);
    this.familyId = params.familyId;
    this.email = params.email;
    this.token = params.token;
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
      email: this.email,
      token: this.token,
      expiresAt: this.expiresAt,
      isUsed: true,
    });
  }

  /**
   * 新しい招待を作成（24時間後に期限切れ）
   */
  static createNew(params: {
    familyId: FamilyId;
    email: Email;
  }): FamilyInvite {
    const token = InviteToken.generate();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24時間後

    return new FamilyInvite({
      familyId: params.familyId,
      email: params.email,
      token,
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
