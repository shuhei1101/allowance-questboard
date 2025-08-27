import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconCategoryEntity } from '../entity/iconCategoryEntity';
import { cache } from '@backend/core/cache/redisCache';

/**
 * アイコンカテゴリDAOクラス
 */
export class IconCategoryDao extends BaseDao<IconCategoryEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconCategoryEntity {
    return IconCategoryEntity;
  }

  @cache("icon_categories:all")
  async fetchAllWithCache(): Promise<IconCategoryEntity[]> {
    return await super.fetchAll();
  }

  @cache("icon_categories:{id}")
  async fetchByIdWithCache(id: number): Promise<IconCategoryEntity | undefined> {
    return await super.fetchById(id);
  }
}
