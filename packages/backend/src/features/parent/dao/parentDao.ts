import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { ParentEntity } from '../entity/parentEntity';
import { cache, evict } from '@backend/core/cache/redisCache';

/**
 * 親DAOクラス
 */
export class ParentDao extends BaseDao<ParentEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => ParentEntity {
    return ParentEntity;
  }

  @cache("parents:all")
  async fetchAllWithCache(): Promise<ParentEntity[]> {
    return await super.fetchAll();
  }

  @cache("parents:{id}")
  async fetchByIdWithCache(id: number): Promise<ParentEntity | null> {
    return await super.fetchById(id);
  }

  @evict("parents:all", "parents:{entity.id}")
  async insertWithCache(entity: ParentEntity): Promise<number> {
    return await super.insert(entity);
  }

  @evict("parents:all", "parents:{entity.id}")
  async updateWithCache(entity: ParentEntity): Promise<void> {
    await super.update(entity);
  }

  @evict("parents:all", "parents:{id}")
  async deleteWithCache(id: number): Promise<void> {
    await super.delete(id);
  }
}
