import { AppBaseEntity } from '../entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';
import { BaseDomainModel } from './baseDomainModel';
import { Version } from '@backend/features/shared/value-object/version';

/**
 * マスタ系ドメインモデルの基底抽象クラス
 */
export abstract class BaseMasterModel<
    IdType extends BaseId, 
    EntityType extends AppBaseEntity
  > extends BaseDomainModel<IdType, EntityType> {

  constructor(
    id: IdType,
    version: Version
  ) {
    super(id, version);
  }
}
