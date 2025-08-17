import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { FamilyMemberEntity } from '../entity/familyMemberEntity';
import { cache, evict } from '@backend/core/cache/redisCache';

/**
 * 家族メンバーDAOクラス
 * QuestDAOクラスを参考にしたTypeScript版
 */
export class FamilyMemberDao extends BaseDao<FamilyMemberEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => FamilyMemberEntity {
    return FamilyMemberEntity;
  }

  /**
   * 全ての家族メンバーを取得（キャッシュ付き）
   */
  @cache("family_members:all")
  async fetchAll(): Promise<FamilyMemberEntity[]> {
    return await super.fetchAll();
  }

  /**
   * IDで家族メンバーを取得（キャッシュ付き）
   */
  @cache("family_members:{id}")
  async fetchById(id: number): Promise<FamilyMemberEntity | null> {
    return await super.fetchById(id);
  }

  /**
   * 家族メンバーを作成（キャッシュクリア付き）
   */
  @evict("family_members:all")
  async insert(entity: FamilyMemberEntity): Promise<number> {
    return await super.insert(entity);
  }

  /**
   * 家族メンバーを更新（キャッシュクリア付き）
   */
  @evict("family_members:all", "family_members:{entity.id}")
  async update(entity: FamilyMemberEntity): Promise<void> {
    await super.update(entity);
  }

  /**
   * 家族メンバーを削除（キャッシュクリア付き）
   */
  @evict("family_members:all", "family_members:{id}")
  async delete(id: number): Promise<void> {
    await super.delete(id);
  }
}
