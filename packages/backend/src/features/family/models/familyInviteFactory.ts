import { FamilyInviteEntity } from "../entity/familyInviteEntity";
import { FamilyInvite } from "./familyInvite";
import { FamilyInviteId } from "../value-object/familyInviteId";
import { FamilyId } from "../value-object/familyId";
import { InviteCode } from "../value-object/inviteCode";

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
      inviteCode: new InviteCode(entity.inviteCode),
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
      inviteCode: model.inviteCode.value,
      expiresAt: model.expiresAt,
      isUsed: model.isUsed,
    });
  }
}
