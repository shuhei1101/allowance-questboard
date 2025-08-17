import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconEntity } from '../entity/iconEntity';

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
}
