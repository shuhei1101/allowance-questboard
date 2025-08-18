import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconLibraryEntity } from '../entity/iconLibraryEntity';
import { cache } from '@backend/core/cache/redisCache';

/**
 * アイコンライブラリDAOクラス
 * アイコンライブラリマスタデータのデータアクセスを管理する
 */
export class IconLibraryDao extends BaseDao<IconLibraryEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconLibraryEntity {
    return IconLibraryEntity;
  }

  @cache("icon_libraries:all")
  async fetchAll(): Promise<IconLibraryEntity[]> {
    return await super.fetchAll();
  }
}
