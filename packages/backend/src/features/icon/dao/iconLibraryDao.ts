import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconLibraryEntity } from '../entity/iconLibraryEntity';

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
}
