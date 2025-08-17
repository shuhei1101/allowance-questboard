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

  /**
   * 全ての親を取得（キャッシュ付き）
   */
  @cache("parents:all")
  async fetchAllWithCache(): Promise<ParentEntity[]> {
    return await super.fetchAll();
  }

  /**
   * IDで親を取得（キャッシュ付き）
   */
  @cache("parents:{id}")
  async fetchByIdWithCache(id: number): Promise<ParentEntity | null> {
    return await super.fetchById(id);
  }

  /**
   * 親を作成（キャッシュクリア付き）
   */
  @evict("parents:all")
  async insertWithCache(entity: ParentEntity): Promise<number> {
    return await super.insert(entity);
  }

  /**
   * 親を更新（キャッシュクリア付き）
   */
  @evict("parents:all", "parents:{entity.id}")
  async updateWithCache(entity: ParentEntity): Promise<void> {
    await super.update(entity);
  }

  /**
   * 親を削除（キャッシュクリア付き）
   */
  @evict("parents:all", "parents:{id}")
  async deleteWithCache(id: number): Promise<void> {
    await super.delete(id);
  }
}
