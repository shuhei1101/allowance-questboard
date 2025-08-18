import { EntityManager } from 'typeorm';
import { BaseTranslationDao } from '@backend/core/dao/baseTranslationDao';
import { IconCategoryTranslationEntity, IconCategoryTranslationEntities } from '../entity/iconCategoryEntity';
import { cache } from '@backend/core/cache/redisCache';

/**
 * アイコンカテゴリ翻訳DAOクラス
 */
export class IconCategoryTranslationDao extends BaseTranslationDao<IconCategoryTranslationEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => IconCategoryTranslationEntity {
    return IconCategoryTranslationEntity;
  }

  @cache("icon_categories_translations:all")
  async findAllTranslationsWithCache(): Promise<IconCategoryTranslationEntities> {
    const baseEntities = await this.findAllTranslations();
    return new IconCategoryTranslationEntities(baseEntities.items);
  }

  @cache("icon_categories_translations:source_id:{sourceId}")
  async findBySourceIdWithCache(sourceId: number): Promise<IconCategoryTranslationEntities> {
    const baseEntities = await this.findBySourceId(sourceId);
    return new IconCategoryTranslationEntities(baseEntities.items);
  }
}
