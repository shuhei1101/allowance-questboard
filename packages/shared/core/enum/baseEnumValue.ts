import { BaseId } from '../value-object/base_id';

/**
 * Enumの値を表す基底抽象クラス
 * PythonのBaseEnumValueクラスのTypeScript版
 */
export abstract class BaseEnumValue<IdType extends BaseId> {
  protected _id: IdType;

  constructor(id: IdType) {
    this._id = id;
  }

  /**
   * 値オブジェクトのIDを返す
   */
  get id(): IdType {
    return this._id;
  }
}
