import { EntityManager } from 'typeorm';
import { BaseDao } from './baseDao';
import { TranslationEntityProtocol } from '../entity/baseTranslationEntity';
import { BaseTranslationEntities } from '../entity/baseTranslationEntities';
import { AppBaseEntity } from '../entity/appBaseEntity';

/**
 * 翻訳データアクセスオブジェクトの基底クラス
 */
export abstract class BaseTranslationDao<TEntity extends AppBaseEntity & TranslationEntityProtocol> extends BaseDao<TEntity> {
  
  constructor(session: EntityManager) {
    super(session);
  }

  /**
   * 全ての翻訳エンティティを取得する
   * @returns BaseTranslationEntitiesオブジェクト
   */
  async findAllTranslations(): Promise<BaseTranslationEntities<TEntity>> {
    const entities = await this.fetchAll();
    return new BaseTranslationEntities(entities);
  }

  /**
   * 指定されたsource_idの翻訳エンティティを取得する
   * @param sourceId 翻訳元レコードのID
   * @returns BaseTranslationEntitiesオブジェクト
   */
  async findBySourceId(sourceId: number): Promise<BaseTranslationEntities<TEntity>> {
    const entities = await this.repository.find({
      where: { sourceId } as any
    });
    return new BaseTranslationEntities(entities);
  }
}
