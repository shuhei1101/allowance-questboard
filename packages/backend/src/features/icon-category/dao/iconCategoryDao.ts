import { EntityManager } from 'typeorm';
import { BaseTranslationDao } from '@backend/core/dao/baseDao';
import { IconCategoryEntity, IconCategoryTranslationEntity, IconCategoryTranslationEntities } from '../entity/iconCategoryEntity';

/**
 * アイコンカテゴリDAOクラス
 * アイコンカテゴリマスタデータのデータアクセスを管理する
 */
export class IconCategoryDao extends BaseTranslationDao<IconCategoryEntity, IconCategoryTranslationEntity, IconCategoryTranslationEntities> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconCategoryEntity {
    return IconCategoryEntity;
  }

  protected get translationEntityClass(): new () => IconCategoryTranslationEntity {
    return IconCategoryTranslationEntity;
  }

  protected get translationEntitiesClass(): new (items: IconCategoryTranslationEntity[]) => IconCategoryTranslationEntities {
    return IconCategoryTranslationEntities;
  }
}
