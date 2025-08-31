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
   * トークンで招待を検索
   */
  async findByToken(token: string): Promise<FamilyInviteEntity | undefined> {
    const result = await this.session
      .createQueryBuilder(FamilyInviteEntity, "fi")
      .where("fi.token = :token", { token })
      .getOne();
    
    return result || undefined;
  }

  /**
   * 家族IDとメールアドレスで有効な招待を検索（重複チェック用）
   */
  async findByFamilyAndEmail(familyId: number, email: string): Promise<FamilyInviteEntity | undefined> {
    const result = await this.session
      .createQueryBuilder(FamilyInviteEntity, "fi")
      .where("fi.familyId = :familyId", { familyId })
      .andWhere("fi.email = :email", { email })
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
