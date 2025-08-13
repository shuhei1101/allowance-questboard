import { EntityManager } from 'typeorm';
import { BaseDao } from 'src/core/dao/baseDao';
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

  /**
   * 全ての言語を取得
   * マスタデータのためキャッシュは不要
   */
  async fetchAll(): Promise<LanguageEntity[]> {
    return await super.fetchAll();
  }
}
