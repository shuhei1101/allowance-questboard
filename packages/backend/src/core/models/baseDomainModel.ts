import { Version } from 'src/features/shared/value-object/version';
import { AppBaseEntity } from '../entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';
import { FamilyMemberId } from 'src/features/family-member/value-object/familyMemberId';
import { ScreenId } from 'src/features/shared/value-object/screenId';
import { BaseModel } from './baseModel';
import { CollectionItemProtocol } from './baseCollection';

/**
 * ドメインモデルの基底抽象クラス
 */
export abstract class BaseDomainModel<
    IdType extends BaseId, 
    EntityType extends AppBaseEntity
  > extends BaseModel implements CollectionItemProtocol<IdType> {
  protected _id: IdType;
  protected _version: Version;
  protected _createdAt?: Date;
  protected _createdBy?: FamilyMemberId;
  protected _createdFrom?: ScreenId;
  protected _updatedAt?: Date;
  protected _updatedBy?: FamilyMemberId;
  protected _updatedFrom?: ScreenId;
  protected _isUpdated: boolean = false;

  constructor(
    id: IdType,
    version: Version,
    createdAt?: Date,
    createdBy?: FamilyMemberId,
    createdFrom?: ScreenId,
    updatedAt?: Date,
    updatedBy?: FamilyMemberId,
    updatedFrom?: ScreenId
  ) {
    super();
    this._id = id;
    this._version = version;
    this._createdAt = createdAt;
    this._createdBy = createdBy;
    this._createdFrom = createdFrom;
    this._updatedAt = updatedAt;
    this._updatedBy = updatedBy;
    this._updatedFrom = updatedFrom;
  }

  /**
   * IDを取得する
   */
  get id(): IdType {
    return this._id;
  }

  /**
   * バージョンを取得する
   */
  get version(): Version {
    return this._version;
  }

  /**
   * 作成日時を取得する
   */
  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  /**
   * 作成者IDを取得する
   */
  get createdBy(): FamilyMemberId | undefined {
    return this._createdBy;
  }

  /**
   * 作成元スクリーンIDを取得する
   */
  get createdFrom(): ScreenId | undefined {
    return this._createdFrom;
  }

  /**
   * 更新日時を取得する
   */
  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  /**
   * 更新者IDを取得する
   */
  get updatedBy(): FamilyMemberId | undefined {
    return this._updatedBy;
  }

  /**
   * 更新元スクリーンIDを取得する
   */
  get updatedFrom(): ScreenId | undefined {
    return this._updatedFrom;
  }

  /**
   * バージョンを1上げ、更新フラグを設定する
   */
  protected _updateVersion(): void {
    if (!this._isUpdated) {
      this._isUpdated = true;
      this._version = new Version(this._version.value + 1);
    }
  }

  /**
   * 他のモデルと同じバージョンかどうかを比較
   */
  isSameVersion(other: BaseDomainModel<any, any>): boolean {
    if (!(other instanceof BaseDomainModel)) {
      return false;
    }
    return this._version.equals(other.version);
  }

  /**
   * ドメインモデルをエンティティに変換する（サブクラスで実装）
   */
  abstract toEntity(): EntityType;
}
