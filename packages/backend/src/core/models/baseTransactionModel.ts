import { AppBaseEntity } from '../entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';
import { BaseDomainModel } from './baseDomainModel';
import { Version } from '@backend/features/shared/value-object/version';
import { FamilyMemberId } from '@backend/features/family-member/value-object/familyMemberId';
import { ScreenId } from '@backend/features/shared/value-object/screenId';

/**
 * トランザクション系ドメインモデルの基底抽象クラス
 * 履歴管理用のプロパティと更新フラグを持つ
 */
export abstract class BaseTransactionModel<
    IdType extends BaseId, 
    EntityType extends AppBaseEntity
  > extends BaseDomainModel<IdType, EntityType> {
  protected isUpdated: boolean = false;

  constructor(
    id: IdType,
    version: Version,
    public createdAt?: Date,
    public createdBy?: FamilyMemberId,
    public createdFrom?: ScreenId,
    public updatedAt?: Date,
    public updatedBy?: FamilyMemberId,
    public updatedFrom?: ScreenId
  ) {
    super(id, version);
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
   * 更新されたかどうかを取得
   */
  get hasUpdated(): boolean {
    return this.isUpdated;
  }

  /**
   * 更新履歴を設定
   */
  protected setUpdateHistory(
    updatedBy?: FamilyMemberId,
    updatedFrom?: ScreenId
  ): void {
    this.updatedAt = new Date();
    this.updatedBy = updatedBy;
    this.updatedFrom = updatedFrom;
    this._updateVersion();
  }
}
