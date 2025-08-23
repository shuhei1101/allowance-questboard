import { BaseDao } from "@backend/core/dao/baseDao";
import { FamilyEntity } from "../entity/familyEntity";
import { EntityManager } from "typeorm";
import { cache, evict } from "@backend/core/cache/redisCache";

export class FamilyDao extends BaseDao<FamilyEntity> {
  constructor(session: EntityManager) {
    super(session);
  }
  
  protected get entityClass(): new () => FamilyEntity {
    return FamilyEntity;
  }
  @cache("families:all")
  async fetchAllWithCache(): Promise<FamilyEntity[]> {
    return await super.fetchAll();
  }

  @cache("families:{id}")
  async fetchByIdWithCache(id: number): Promise<FamilyEntity | null> {
    return await super.fetchById(id);
  }

  @evict("families:all", "families:{entity.id}")
  async updateWithCache(entity: FamilyEntity): Promise<void> {
    await super.update(entity);
  }

  @evict("families:all", "families:{entity.id}")
  async insertWithCache(entity: FamilyEntity): Promise<number> {
    return await super.insert(entity);
  }

  @evict("families:all", "families:{id}")
  async deleteWithCache(id: number): Promise<void> {
    await super.delete(id);
  }
}
