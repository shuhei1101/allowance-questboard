import { AppBaseEntity } from '../entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';
import { BaseModel } from './baseModel';
import { CollectionItemProtocol } from './baseCollection';
import { Version } from '@backend/features/shared/value-object/version';

/**
 * ドメインモデルの基底抽象クラス
 * 最小限のプロパティ（id、version）のみを持つ
 */
export abstract class BaseDomainModel<
    IdType extends BaseId, 
    EntityType extends AppBaseEntity
  > extends BaseModel implements CollectionItemProtocol<IdType> {

  constructor(
    public id: IdType,
    public version: Version
  ) {
    super();
  }

  /**
   * 他のモデルと同じバージョンかどうかを比較
   */
  isSameVersion(other: BaseDomainModel<any, any>): boolean {
    if (!(other instanceof BaseDomainModel)) {
      return false;
    }
    return this.version.equals(other.version);
  }

  /**
   * ドメインモデルをエンティティに変換する（サブクラスで実装）
   */
  abstract toEntity(): EntityType;
}
