import { TranslationEntityProtocol } from './baseTranslationEntity';

/**
 * 翻訳エンティティコレクションの基底クラス
 */
export class BaseTranslationEntities<TEntity extends TranslationEntityProtocol> {
  private _items: TEntity[];
  private _itemsBySourceId: { [sourceId: number]: { [languageId: number]: TEntity } } = {};

  constructor(items: TEntity[]) {
    this._items = items;
    this.updateItemsBySourceId();
  }

  /**
   * source_idごとの辞書を更新する
   */
  private updateItemsBySourceId(): void {
    this._itemsBySourceId = {};
    for (const item of this._items) {
      if (!this._itemsBySourceId[item.sourceId]) {
        this._itemsBySourceId[item.sourceId] = {};
      }
      this._itemsBySourceId[item.sourceId][item.languageId] = item;
    }
  }

  /**
   * source_idとlanguage_idでアイテムを取得
   * @param sourceId 翻訳元レコードのID
   * @param languageId 言語ID
   * @returns 該当する翻訳エンティティまたはnull
   */
  get(sourceId: number, languageId: number): TEntity | null {
    if (typeof sourceId !== 'number') {
      throw new TypeError(`source_idはnumberである必要があります。実際: ${typeof sourceId}`);
    }
    if (typeof languageId !== 'number') {
      throw new TypeError(`language_idはnumberである必要があります。実際: ${typeof languageId}`);
    }

    const sourceItems = this._itemsBySourceId[sourceId];
    if (!sourceItems) {
      return null;
    }

    return sourceItems[languageId] || null;
  }

  /**
   * source_idで全ての言語のアイテムを辞書型で取得
   * @param sourceId 翻訳元レコードのID
   * @returns 言語IDをキーとした翻訳エンティティの辞書
   */
  getBySourceId(sourceId: number): { [languageId: number]: TEntity } {
    if (typeof sourceId !== 'number') {
      throw new TypeError(`source_idはnumberである必要があります。実際: ${typeof sourceId}`);
    }

    const sourceItems = this._itemsBySourceId[sourceId];
    if (!sourceItems) {
      return {};
    }

    // 新しいオブジェクトを返して元の辞書を保護
    return { ...sourceItems };
  }

  /**
   * 全てのアイテムを取得
   * @returns 翻訳エンティティの配列
   */
  get items(): TEntity[] {
    return [...this._items]; // 元の配列を保護するためにコピーを返す
  }

  /**
   * アイテム数を取得
   * @returns アイテム数
   */
  get count(): number {
    return this._items.length;
  }

  /**
   * 空かどうかを判定
   * @returns 空の場合true
   */
  get isEmpty(): boolean {
    return this._items.length === 0;
  }

  /**
   * 指定されたsource_idのアイテムが存在するかチェック
   * @param sourceId 翻訳元レコードのID
   * @returns 存在する場合true
   */
  hasSourceId(sourceId: number): boolean {
    if (typeof sourceId !== 'number') {
      throw new TypeError(`source_idはnumberである必要があります。実際: ${typeof sourceId}`);
    }
    
    return sourceId in this._itemsBySourceId;
  }

  /**
   * 指定されたsource_idとlanguage_idの組み合わせが存在するかチェック
   * @param sourceId 翻訳元レコードのID
   * @param languageId 言語ID
   * @returns 存在する場合true
   */
  has(sourceId: number, languageId: number): boolean {
    return this.get(sourceId, languageId) !== null;
  }

  /**
   * 全てのsource_idを取得
   * @returns source_idの配列
   */
  getSourceIds(): number[] {
    return Object.keys(this._itemsBySourceId).map(id => parseInt(id, 10));
  }

  /**
   * 指定されたsource_idで利用可能な言語IDを取得
   * @param sourceId 翻訳元レコードのID
   * @returns 言語IDの配列
   */
  getLanguageIds(sourceId: number): number[] {
    if (typeof sourceId !== 'number') {
      throw new TypeError(`source_idはnumberである必要があります。実際: ${typeof sourceId}`);
    }

    const sourceItems = this._itemsBySourceId[sourceId];
    if (!sourceItems) {
      return [];
    }

    return Object.keys(sourceItems).map(id => parseInt(id, 10));
  }
}
