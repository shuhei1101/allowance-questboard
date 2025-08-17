import { BaseId } from '@backend/core/value-object/base_id';

/**
 * アイコンカテゴリのIDを表すクラス
 */
export class IconCategoryId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /**
   * IDの名前を返す
   */
  protected get _valueName(): string {
    return `IconCategoryId(${this._value})`;
  }
}
