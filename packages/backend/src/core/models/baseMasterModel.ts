import { AppBaseEntity } from '../entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';
import { BaseDomainModel } from './baseDomainModel';
import { Version } from '@backend/features/shared/value-object/version';

/**
 * マスタ系ドメインモデルの基底抽象クラス
 * 更新フラグとバージョン更新機能を持つ
 */
export abstract class BaseMasterModel<
    IdType extends BaseId, 
    EntityType extends AppBaseEntity
  > extends BaseDomainModel<IdType, EntityType> {
  protected isUpdated: boolean = false;

  constructor(
    id: IdType,
    version: Version
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
}
