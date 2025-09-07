import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';

// ページネーション情報
export interface Pagination {
  page: number;       // 現在ページ
  pageSize: number;   // 1ページあたりの件数
  totalItems?: number;// 総件数（任意）
  totalPages?: number;// 総ページ数（任意）
}

// 一覧データ用アクション
export type SetData<T> = (data: T[]) => void;
export type SetPagination = (pagination: Partial<Pagination>) => void;
export type ResetPagination = () => void;

// 一覧表示用プロパティ型
export interface BaseViewProperties<T> extends BaseStoreProperties {
  data: T[];           // 表示するデータ一覧
  pagination: Pagination; // ページ情報
}

// 一覧表示用アクション型
export interface BaseViewActions<T> extends BaseStoreActions {
  setData: SetData<T>;           // データをセット
  setPagination: SetPagination;   // ページ情報を更新
  resetPagination: ResetPagination; // ページ情報を初期化
}

export abstract class BaseViewStore<
  TItem = any,
  TProps extends BaseViewProperties<TItem> = BaseViewProperties<TItem>,
  TActions extends BaseViewActions<TItem> = BaseViewActions<TItem>
> extends BaseStore<TProps, TActions> {

  /** データ一覧をセット */
  protected abstract setData(set: any): SetData<TItem>;

  /** ページネーションを更新（部分更新可） */
  protected setPagination(set: any): SetPagination {
    return (pagination) => set((state: any) => ({
      pagination: {
        ...state.pagination,
        ...pagination,
      },
    }), false, 'setPagination');
  }

  /** ページネーションを初期値に戻す */
  protected resetPagination(set: any): ResetPagination {
    return () => set({ pagination: this.buildDefaultProperties().pagination }, false, 'resetPagination');
  }

  /** デフォルトプロパティ生成 */
  protected buildDefaultProperties(): TProps {
    return {
      ...super.buildDefaultProperties(),
      data: [], // 初期は空配列
      pagination: {
        page: 1,       // 初期ページ1
        pageSize: 10,  // デフォルト10件
      },
    } as TProps;
  }

  /** アクションまとめ */
  protected buildActions(
    set: StoreApi<TProps & BaseViewActions<TItem> & TActions>['setState'],
    get: StoreApi<TProps & BaseViewActions<TItem> & TActions>['getState']
  ): TActions {
    return {
      ...super.buildActions(set, get),
      setData: this.setData(set),
      setPagination: this.setPagination(set),
      resetPagination: this.resetPagination(set),
    } as TActions;
  }
}
