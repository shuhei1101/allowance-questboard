import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { FamilyMemberEntity } from '../entity/familyMemberEntity';
import { cache, evict } from '@backend/core/cache/redisCache';

/**
 * 家族メンバーDAOクラス
 */
export class FamilyMemberDao extends BaseDao<FamilyMemberEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => FamilyMemberEntity {
    return FamilyMemberEntity;
  }

  @cache("family_members:all")
  async fetchAllWithCache(): Promise<FamilyMemberEntity[]> {
    return await super.fetchAll();
  }

  @cache("family_members:{id}")
  async fetchByIdWithCache(id: number): Promise<FamilyMemberEntity | undefined> {
    return await super.fetchById(id);
  }

  @cache("family_members:{entity.id}")
  async insertWithCache(entity: FamilyMemberEntity): Promise<number> {
    return await super.insert(entity);
  }

  @evict("family_members:all", "family_members:{entity.id}")
  async updateWithCache(entity: FamilyMemberEntity): Promise<void> {
    await super.update(entity);
  }

  @evict("family_members:all", "family_members:{id}")
  async deleteWithCache(id: number): Promise<void> {
    await super.delete(id);
  }
}
