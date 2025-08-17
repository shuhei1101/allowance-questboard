import { EntityManager, Repository } from 'typeorm';
import { AppBaseEntity } from '../entity/appBaseEntity';
import { TranslationEntityProtocol } from '../entity/baseTranslationEntity';
import { BaseTranslationEntities } from '../entity/baseTranslationEntities';

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
   * Repositoryを取得する（遅延初期化）
   */
  protected get repository(): Repository<TEntity> {
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
   * 新しいエンティティを作成する
   * @param entity 作成するエンティティオブジェクト
   * @returns 作成されたエンティティのID
   */
  async insert(entity: TEntity): Promise<number> {
    const result = await this.repository.save(entity);
    return result.id;
  }

  /**
   * エンティティを更新する
   * @param entity 更新するエンティティ
   */
  async update(entity: TEntity): Promise<void> {
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

/**
 * 翻訳対応データアクセスオブジェクトの基底クラス
 * メインエンティティと翻訳エンティティを一緒に取得する
 */
export abstract class BaseTranslationDao<
  TMainEntity extends AppBaseEntity,
  TTranslationEntity extends TranslationEntityProtocol,
  TTranslationEntities extends BaseTranslationEntities<TTranslationEntity>
> extends BaseDao<TMainEntity> {
  private _translationRepository: Repository<TTranslationEntity> | null = null;

  /**
   * 翻訳エンティティクラスを返す（サブクラスで実装必須）
   */
  protected abstract get translationEntityClass(): new () => TTranslationEntity;

  /**
   * 翻訳エンティティコレクションクラスを返す（サブクラスで実装必須）
   */
  protected abstract get translationEntitiesClass(): new (items: TTranslationEntity[]) => TTranslationEntities;

  /**
   * 翻訳エンティティのRepositoryを取得する（遅延初期化）
   */
  protected get translationRepository(): Repository<TTranslationEntity> {
    if (!this._translationRepository) {
      this._translationRepository = this.session.getRepository(this.translationEntityClass);
    }
    return this._translationRepository;
  }

  /**
   * エンティティと翻訳エンティティを一緒に取得する
   * @returns { entities: メインエンティティリスト, translations: 翻訳エンティティコレクション }
   */
  async fetchAllWithTranslations(): Promise<{ entities: TMainEntity[], translations: TTranslationEntities }> {
    // メインエンティティを取得
    const entities = await this.fetchAll();
    
    // 翻訳エンティティを取得
    const translationEntities = await this.translationRepository.find();
    
    // 翻訳エンティティコレクションを作成
    const translations = new (this.translationEntitiesClass)(translationEntities);

    return { entities, translations };
  }

  /**
   * 指定されたIDのエンティティと翻訳エンティティを取得する
   * @param id エンティティのID
   * @returns { entity: メインエンティティ, translations: 翻訳エンティティコレクション }
   */
  async fetchByIdWithTranslations(id: number): Promise<{ entity: TMainEntity | null, translations: TTranslationEntities }> {
    // メインエンティティを取得
    const entity = await this.fetchById(id);
    
    // 該当IDの翻訳エンティティを取得
    const translationEntities = await this.translationRepository.find({
      where: { sourceId: id } as any
    });
    
    // 翻訳エンティティコレクションを作成
    const translations = new (this.translationEntitiesClass)(translationEntities);

    return { entity, translations };
  }
}
