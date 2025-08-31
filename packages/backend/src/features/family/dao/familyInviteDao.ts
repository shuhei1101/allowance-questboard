import { BaseDao } from "@backend/core/dao/baseDao";
import { FamilyInviteEntity } from "../entity/familyInviteEntity";
import { EntityManager } from "typeorm";

export class FamilyInviteDao extends BaseDao<FamilyInviteEntity> {
  constructor(session: EntityManager) {
    super(session);
  }
  
  protected get entityClass(): new () => FamilyInviteEntity {
    return FamilyInviteEntity;
  }

  /**
   * 招待コードで招待を検索
   */
  async findByInviteCode(inviteCode: string): Promise<FamilyInviteEntity | undefined> {
    const result = await this.session
      .createQueryBuilder(FamilyInviteEntity, "fi")
      .where("fi.inviteCode = :inviteCode", { inviteCode })
      .getOne();
    
    return result || undefined;
  }

  /**
   * 家族IDで有効な招待を検索（複数発行防止用）
   */
  async findActiveByFamilyId(familyId: number): Promise<FamilyInviteEntity | undefined> {
    const result = await this.session
      .createQueryBuilder(FamilyInviteEntity, "fi")
      .where("fi.familyId = :familyId", { familyId })
      .andWhere("fi.isUsed = false")
      .andWhere("fi.expiresAt > :now", { now: new Date() })
      .getOne();
    
    return result || undefined;
  }

  /**
   * 期限切れの招待を削除
   */
  async deleteExpired(): Promise<void> {
    await this.session
      .createQueryBuilder()
      .delete()
      .from(FamilyInviteEntity)
      .where("expiresAt < :now", { now: new Date() })
      .execute();
  }
}
