import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
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
}
