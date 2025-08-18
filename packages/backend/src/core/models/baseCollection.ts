import { BaseId } from '../value-object/base_id';

/**
 * コレクションアイテムのプロトコル（インターフェース）
 */
export interface CollectionItemProtocol<IdType extends BaseId> {
  /**
   * アイテムのIDを返す
   */
  readonly id: IdType;
}

/**
 * IDをもつクラスのコレクションを表現する基底抽象クラス（ファーストコレクション）
 */
export abstract class BaseCollection<
  ItemType extends CollectionItemProtocol<IdType>,
  IdType extends BaseId
> {
  protected _items: ItemType[];
  protected _itemByIds: Map<string, ItemType> = new Map();

  constructor(items: ItemType[]) {
    this._items = items;
    this.updateIndex();
  }

  /**
   * 空のコレクションを作成する
   */
  static fromEmpty<T extends BaseCollection<any, any>>(
    this: new (items: any[]) => T
  ): T {
    return new this([]);
  }

  /**
   * インデックス辞書の更新
   */
  updateIndex(): void {
    this._itemByIds.clear();
    for (const item of this._items) {
      // BaseIdのhash()メソッドを使用してMapのキーにする
      const key = item.id.hash().toString();
      this._itemByIds.set(key, item);
    }
    this._updateCustomIndex();
  }

  /**
   * アイテムを追加
   */
  append(item: ItemType): void {
    if (!item || typeof item !== 'object') {
      throw new TypeError(`Expected item of valid type, got ${typeof item}`);
    }
    this._items.push(item);
    this.updateIndex();
  }

  /**
   * IDでアイテムを取得
   */
  get(itemId: IdType): ItemType | null {
    const key = itemId.hash().toString();
    return this._itemByIds.get(key) || null;
  }

  /**
   * アイテム数を取得
   */
  get length(): number {
    return this._items.length;
  }

  /**
   * すべてのアイテムを取得（読み取り専用）
   */
  get items(): readonly ItemType[] {
    return [...this._items];
  }

  /**
   * 具象クラスで実装するカスタムインデックスの更新メソッド（任意）
   * 
   * 内部に複数の辞書を持つ場合はここで更新処理を実装
   */
  protected abstract _updateCustomIndex(): void;
}
