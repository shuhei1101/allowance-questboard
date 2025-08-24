/**
 * ハッシュ可能
 */
export interface Hashable {
  /**
   * ハッシュ値を返す
   */
  hash(): number | string;
}

/**
 * コレクションアイテムのプロトコル（インターフェース）
 */
export interface CollectionItemProtocol<TKey extends Hashable> {
  /**
   * アイテムのIDを返す
   */
  readonly key: TKey | null;
}

/**
 * IDをもつクラスのコレクションを表現する基底抽象クラス（ファーストコレクション）
 */
export abstract class BaseCollection<
  TItem extends CollectionItemProtocol<TKey>,
  TKey extends Hashable
> {
  protected readonly itemByIds: Map<string, TItem> = new Map();

  constructor(
    public readonly items: TItem[]) 
  {
    this.updateIndex();
  }
  
  static fromEmpty<TItem extends CollectionItemProtocol<TKey>, TKey extends Hashable>(
    this: new (items: TItem[]) => BaseCollection<TItem, TKey>
  ): BaseCollection<TItem, TKey> {
    return new this([]);
  }

  /**
   * インデックス辞書の更新
   */
  updateIndex(): void {
    this.itemByIds.clear();
    for (const item of this.items) {
      if (!item.key) {
        continue;
      }
      // BaseIdのhash()メソッドを使用してMapのキーにする
      const key = item.key.hash().toString();
      this.itemByIds.set(key, item);
    }
    this.updateCustomIndex();
  }

  /**
   * アイテムを追加
   */
  append(item: TItem): void {
    this.items.push(item);
    this.updateIndex();
  }

  /**
   * IDでアイテムを取得
   */
  get(itemId: TKey): TItem | null {
    const key = itemId.hash().toString();
    return this.itemByIds.get(key) || null;
  }

  /**
   * アイテム数を取得
   */
  get length(): number {
    return this.items.length;
  }

  [Symbol.iterator](): Iterator<TItem> {
    return this.items[Symbol.iterator]();
  }

  map<TResult>(callback: (item: TItem, index: number) => TResult): TResult[] {
    return this.items.map(callback);
  }

  /**
   * 具象クラスで実装するカスタムインデックスの更新メソッド（任意）
   * 
   * 内部に複数の辞書を持つ場合はここで更新処理を実装
   */
  protected abstract updateCustomIndex(): void;
}
