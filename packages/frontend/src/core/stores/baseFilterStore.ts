import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';

// フィルターのクリア
export type ClearFilters = () => void;
// フィルターを初期値に戻す
export type ResetFilters = () => void;

// フィルター用のプロパティ型
export interface BaseFilterProperties<TFilters extends Record<string, any>> extends BaseStoreProperties {
  filters: TFilters; // 検索条件をまとめるオブジェクト
}

// フィルター用のアクション型
export interface BaseFilterActions<TFilters extends Record<string, any>> extends BaseStoreActions {
  clearFilters: ClearFilters; // 全条件を空にする
  resetFilters: ResetFilters; // 初期値に戻す
  setFilter: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void; // 個別条件をセット
}

export abstract class BaseFilterStore<
  TFilters extends Record<string, any> = Record<string, any>,
  TProps extends BaseFilterProperties<TFilters> = BaseFilterProperties<TFilters>,
  TActions extends BaseFilterActions<TFilters> = BaseFilterActions<TFilters>
> extends BaseStore<TProps, TActions> {

  protected abstract setFilters();

  /** 全ての条件を空にする */
  protected clearFilters(set: any): ClearFilters {
    return () => {
      const cleared: Partial<TFilters> = {};
      Object.keys(this.buildDefaultProperties().filters).forEach(
        k => cleared[k as keyof TFilters] = undefined
      );
      set({ filters: cleared }, false, 'clearFilters');
    };
  }

  /** 初期値に戻す */
  protected resetFilters(set: any): ResetFilters {
    return () => set({ filters: this.buildDefaultProperties().filters }, false, 'resetFilters');
  }

  /** デフォルトプロパティを生成 */
  protected buildDefaultProperties(): TProps {
    return {
      ...super.buildDefaultProperties(),
      filters: this.initializeFilters(), // 初期フィルターを取得
    } as TProps;
  }

  /** 継承先で初期フィルターを定義する */
  protected abstract initializeFilters(): TFilters;

  /** アクションをまとめる */
  protected buildActions(set: StoreApi<TProps & BaseFilterActions & TActions>['setState']): TActions {
    return {
      ...super.buildActions(set),
      clearFilters: this.clearFilters(set),
      resetFilters: this.resetFilters(set),
    } as TActions;
  }
}