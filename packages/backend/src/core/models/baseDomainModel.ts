import { BaseId } from '../value-object/base_id';
import { BaseModel } from './baseModel';
import { CollectionItemProtocol } from './baseCollection';

/**
 * ドメインモデルの基底抽象クラス
 * 最小限のプロパティ（id、version）のみを持つ
 */
export abstract class BaseDomainModel<TId extends BaseId> extends BaseModel implements CollectionItemProtocol<TId> {
  constructor(
    public id?: TId,
  ) {
    super();
  }

  get key(): TId | undefined {
    return this.id || undefined;
  }

  static createNew(params: any): any {
    throw new Error("Method not implemented.");
  }
}
