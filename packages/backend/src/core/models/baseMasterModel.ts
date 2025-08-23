import { BaseId } from '../value-object/base_id';
import { BaseDomainModel } from './baseDomainModel';

/**
 * マスタ系ドメインモデルの基底抽象クラス
 */
export abstract class BaseMasterModel<IdType extends BaseId> extends BaseDomainModel<IdType> {

  constructor(
    id: IdType,
  ) {
    super(id);
  }
}
