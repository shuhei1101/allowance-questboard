import { EntityManager, Repository } from 'typeorm';
import { AppBaseEntity } from '../entity/appBaseEntity';
import { LocaleString } from '../messages/localeString';
import { DatabaseError } from '../errors/databaseError';

/**
 * データアクセスオブジェクトの基底クラス（排他制御対応）
 */
export abstract class BaseDao<TEntity extends AppBaseEntity> {
  protected session: EntityManager;
  private _repository: Repository<TEntity> | null = null;

  constructor(session: EntityManager) {
    this.session = session;
  }

  /**
   * エンティティクラスを返す（サブクラスで実装必須）
   */
  protected abstract get entityClass(): new () => TEntity;

  /**
   * TypeORMのRepositoryを取得する（遅延初期化）
   */
  protected get repository(): Repository<TEntity> {
    if (!this._repository) {
      this._repository = this.session.getRepository(this.entityClass);
    }
    return this._repository;
  }

  /**
   * 指定したIDの現在のバージョンを取得する
   */
  private async getVersion(id: number): Promise<number> {
    const entity = await this.fetchById(id);
    if (!entity) {
      throw new DatabaseError({ message: new LocaleString({
        ja: 'エンティティが存在しません。',
        en: 'Entity does not exist.'
      })});
    }
    return entity.version;
  }

  /**
   * バージョン確認(楽観的排他制御)
   * @throws DatabaseError
   */
  private async checkVersion(entity: TEntity): Promise<void> {
    // 楽観的排他制御
    const currentVersion = await this.getVersion(entity.id);
    if (currentVersion !== entity.version) {
      throw new DatabaseError({ message: new LocaleString({
        ja: 'エンティティのバージョンが一致しません。最新のデータを取得して再度更新してください。',
        en: 'Entity version mismatch. Please fetch the latest data and try updating again.'
      })});
    }
  }

  /**
   * 全てのエンティティを取得する
   * @returns エンティティのリスト
   */
  async fetchAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  /**
   * IDでエンティティを取得する
   * @param id エンティティのID
   * @returns エンティティオブジェクト（見つからない場合はnull）
   */
  async fetchById(id: number): Promise<TEntity | null> {
    return await this.repository.findOne({ 
      where: { id } as any 
    });
  }

  /**
   * エンティティをインサートする
   */
  async insert(entity: TEntity): Promise<number> {
    const result = await this.repository.save(entity);
    return result.id;
  }

  /**
   * エンティティを更新する
   */
  async update(entity: TEntity): Promise<void> {
    await this.checkVersion(entity);
    await this.repository.save(entity);
  }

  /**
   * IDでエンティティを削除する
   * @param id 削除するエンティティのID
   */
  async delete(id: number): Promise<void> {
    await this.checkVersion({ id } as TEntity);    
    const entity = await this.fetchById(id);
    if (entity) {
      await this.repository.remove(entity);
    }
  }
}
