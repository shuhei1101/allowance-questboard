import { EntityManager } from 'typeorm';
import { BaseDao } from '@backend/core/dao/baseDao';
import { QuestEntity } from '../entity/questEntity';
import { cache, evict } from '@backend/core/cache/redisCache';

/**
 * クエストDAOクラス
 */
export class QuestDao extends BaseDao<QuestEntity> {
  constructor(session: EntityManager) {
    super(session);
  }

  protected get entityClass(): new () => QuestEntity {
    return QuestEntity;
  }

  /**
   * 全てのクエストを取得（キャッシュ付き）
   */
  @cache("quests:all")
  async fetchAll(): Promise<QuestEntity[]> {
    return await super.fetchAll();
  }

  /**
   * IDでクエストを取得（キャッシュ付き）
   */
  @cache("quests:{id}")
  async fetchById(id: number): Promise<QuestEntity | null> {
    return await super.fetchById(id);
  }

  /**
   * クエストを作成（キャッシュクリア付き）
   */
  @evict("quests:all")
  async insert(entity: QuestEntity): Promise<number> {
    return await super.insert(entity);
  }

  /**
   * クエストを更新（キャッシュクリア付き）
   */
  @evict("quests:all", "quests:{entity.id}")
  async update(entity: QuestEntity): Promise<void> {
    await super.update(entity);
  }

  /**
   * クエストを削除（キャッシュクリア付き）
   */
  @evict("quests:all", "quests:{id}")
  async delete(id: number): Promise<void> {
    await super.delete(id);
  }
}
