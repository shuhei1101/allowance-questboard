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
  public isUpdated: boolean = false;

  constructor(
    public id: IdType,
    public version: Version
  ) {
    super();
  }

  /**
   * バージョンを1上げ、更新フラグを設定する
   */
  protected _updateVersion(): void {
    if (!this.isUpdated) {
      this.isUpdated = true;
      this.version = new Version(this.version.value + 1);
    }
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
