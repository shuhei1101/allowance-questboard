import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { LanguageEntity } from '../entity/languageEntity';

/**
 * 言語DAOクラス
 * 言語マスタデータのデータアクセスを管理する
 */
export class LanguageDao extends BaseDao<LanguageEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => LanguageEntity {
    return LanguageEntity;
  }
}
