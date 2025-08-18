import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconKeyByLibraryEntity } from '../entity/iconKeyByLibraryEntity';
import { cache } from '@backend/core/cache/redisCache';

/**
 * ライブラリ別アイコンキーDAOクラス
 * ライブラリ別アイコンキーマスタデータのデータアクセスを管理する
 */
export class IconKeyByLibraryDao extends BaseDao<IconKeyByLibraryEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconKeyByLibraryEntity {
    return IconKeyByLibraryEntity;
  }

  @cache("icon_key_by_libraries:all")
  async fetchAll(): Promise<IconKeyByLibraryEntity[]> {
    return await super.fetchAll();
  }
}
