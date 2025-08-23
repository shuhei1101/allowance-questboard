import { EntityManager } from 'typeorm';

export interface BaseRepositoryDependencies {
  session: EntityManager;
}

/**
 * リポジトリの基底クラス
 * PythonのBaseRepositoryクラスのTypeScript版
 */
export abstract class BaseRepository {
  protected session: EntityManager;

  constructor(deps: BaseRepositoryDependencies) {
    this.session = deps.session;
  }
}
