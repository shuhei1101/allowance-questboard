import { BaseId } from '../value-object/base_id';
import { BaseDomainModel } from './baseDomainModel';
import { FamilyMemberId } from '@backend/features/family-member/value-object/familyMemberId';
import { ScreenId } from '@backend/features/shared/value-object/screenId';

/**
 * トランザクション系ドメインモデルの基底抽象クラス
 * 履歴管理用のプロパティを持つ
 */
export abstract class BaseTransactionModel<IdType extends BaseId> extends BaseDomainModel<IdType> {

  constructor(
    id: IdType,
    public createdAt?: Date,
    public createdBy?: FamilyMemberId,
    public createdFrom?: ScreenId,
    public updatedAt?: Date,
    public updatedBy?: FamilyMemberId,
    public updatedFrom?: ScreenId
  ) {
    super(id);
  }
}
