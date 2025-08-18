import { BaseId } from '../value-object/base_id';
import { BaseModel } from './baseModel';
import { CollectionItemProtocol } from './baseCollection';
import { Version } from '@backend/features/shared/value-object/version';

/**
 * ドメインモデルの基底抽象クラス
 * 最小限のプロパティ（id、version）のみを持つ
 */
export abstract class BaseDomainModel<TId extends BaseId> extends BaseModel implements CollectionItemProtocol<TId> {
  public isUpdated: boolean = false;

  constructor(
    public id: TId,
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
  isSameVersion(other: BaseDomainModel<any>): boolean {
    if (!(other instanceof BaseDomainModel)) {
      return false;
    }
    return this.version.equals(other.version);
  }
}
