import { AppBaseEntity } from '@backend/core/entity/appBaseEntity';
import { BaseId } from '../value-object/base_id';

/**
 * Enumの値が実装すべきメソッドを定義するインターフェース
 * PythonのEnumValueProtocolのTypeScript版
 */
export interface EnumValueProtocol<IdType extends BaseId, EntityType extends AppBaseEntity = AppBaseEntity> {
  /**
   * 値オブジェクトのIDを返す
   */
  readonly id: IdType;

  /**
   * エンティティから値を設定する
   * @param entity エンティティ
   */
  setFromEntity(entity: EntityType): void;
}
