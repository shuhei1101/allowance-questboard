import { FamilyInviteEntity } from "../entity/familyInviteEntity";
import { FamilyInvite } from "./familyInvite";
import { FamilyInviteId } from "../value-object/familyInviteId";
import { FamilyId } from "../value-object/familyId";
import { Email } from "@backend/features/auth/value-object/email";
import { InviteToken } from "../value-object/inviteToken";

/**
 * FamilyInvite ファクトリークラス
 * EntityとDomainModelの変換を担当
 */
export class FamilyInviteFactory {
  /**
   * エンティティからドメインモデルに変換
   */
  static fromEntity(entity: FamilyInviteEntity): FamilyInvite {
    return new FamilyInvite({
      id: new FamilyInviteId(entity.id),
      familyId: new FamilyId(entity.familyId),
      email: new Email(entity.email),
      token: new InviteToken(entity.token),
      expiresAt: entity.expiresAt,
      isUsed: entity.isUsed,
    });
  }

  /**
   * ドメインモデルからエンティティに変換
   */
  static toEntity(model: FamilyInvite): FamilyInviteEntity {
    return FamilyInviteEntity.fromRaw({
      id: model.id?.value,
      familyId: model.familyId.value,
      email: model.email.value,
      token: model.token.value,
      expiresAt: model.expiresAt,
      isUsed: model.isUsed,
    });
  }
}
