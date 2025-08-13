import { EntityManager } from 'typeorm';
import { BaseDao } from 'src/core/dao/baseDao';
import { FamilyMemberTypeEntity } from '../entity/familyMemberTypeEntity';

/**
 * 家族メンバータイプDAOクラス
 * 家族メンバータイプマスタデータのデータアクセスを管理する
 */
export class FamilyMemberTypeDao extends BaseDao<FamilyMemberTypeEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => FamilyMemberTypeEntity {
    return FamilyMemberTypeEntity;
  }

  /**
   * 全ての家族メンバータイプを取得
   * マスタデータのためキャッシュは不要
   */
  async fetchAll(): Promise<FamilyMemberTypeEntity[]> {
    return await super.fetchAll();
  }
}
