import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { IconCategoryEntity } from '../entity/iconCategoryEntity';

/**
 * アイコンカテゴリDAOクラス
 * アイコンカテゴリマスタデータのデータアクセスを管理する
 */
export class IconCategoryDao extends BaseDao<IconCategoryEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconCategoryEntity {
    return IconCategoryEntity;
  }
}
