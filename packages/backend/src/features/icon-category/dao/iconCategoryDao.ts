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
  async fetchAll(): Promise<IconCategoryEntity[]> {
    return await super.fetchAll();
  }

  @cache("icon_categories:{id}")
  async fetchById(id: number): Promise<IconCategoryEntity | null> {
    return await super.fetchById(id);
  }
}
