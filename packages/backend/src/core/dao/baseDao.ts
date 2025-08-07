import { EntityManager, Repository, ObjectLiteral } from 'typeorm';
import { AppBaseEntity } from '../entity/appBaseEntity';

/**
 * データアクセスオブジェクトの基底クラス（排他制御対応）
 * PythonのBaseDAOクラスのTypeScript版
 */
export abstract class BaseDao<EntityType extends AppBaseEntity> {
  protected session: EntityManager;
  private _repository: Repository<EntityType> | null = null;

  constructor(session: EntityManager) {
    this.session = session;
  }

  /**
   * エンティティクラスを返す（サブクラスで実装必須）
   */
  protected abstract get entityClass(): new () => EntityType;

  /**
   * Repositoryを取得する（遅延初期化）
   */
  protected get repository(): Repository<EntityType> {
    if (!this._repository) {
      this._repository = this.session.getRepository(this.entityClass);
    }
    return this._repository;
  }

  /**
   * 指定したIDの現在のバージョンを取得する
   * @param id エンティティのID
   * @returns 現在のバージョン
   * @throws エラー 指定したIDのエンティティが存在しない場合
   */
  async getVersion(id: number): Promise<number> {
    const entity = await this.fetchById(id);
    if (!entity) {
      throw new Error(`Entity with id ${id} does not exist.`);
    }
    return entity.version;
  }

  /**
   * 全てのエンティティを取得する
   * @returns エンティティのリスト
   */
  async fetchAll(): Promise<EntityType[]> {
    return await this.repository.find();
  }

  /**
   * IDでエンティティを取得する
   * @param id エンティティのID
   * @returns エンティティオブジェクト（見つからない場合はnull）
   */
  async fetchById(id: number): Promise<EntityType | null> {
    return await this.repository.findOne({ 
      where: { id } as any 
    });
  }

  /**
   * 新しいエンティティを作成する
   * @param entity 作成するエンティティオブジェクト
   * @returns 作成されたエンティティのID
   */
  async insert(entity: EntityType): Promise<number> {
    const result = await this.repository.save(entity);
    return result.id;
  }

  /**
   * エンティティを更新する
   * @param entity 更新するエンティティ
   */
  async update(entity: EntityType): Promise<void> {
    await this.repository.save(entity);
  }

  /**
   * IDでエンティティを削除する
   * @param id 削除するエンティティのID
   */
  async delete(id: number): Promise<void> {
    const entity = await this.fetchById(id);
    if (entity) {
      await this.repository.remove(entity);
    }
  }
}
