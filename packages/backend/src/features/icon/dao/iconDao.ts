import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconEntity } from '../entity/iconEntity';
import { cache } from '@backend/core/cache/redisCache';

/**
 * アイコンDAOクラス
 * アイコンマスタデータのデータアクセスを管理する
 */
export class IconDao extends BaseDao<IconEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconEntity {
    return IconEntity;
  }

  @cache("icons:all")
  async fetchAll(): Promise<IconEntity[]> {
    return await super.fetchAll();
  }
}
