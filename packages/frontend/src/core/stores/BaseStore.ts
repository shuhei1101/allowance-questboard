import { StoreApi } from 'zustand';

// シグネチャ定義
export type Reset = () => void;

export interface BaseStoreProperties {}
export interface BaseStoreActions {
  reset: Reset;
}

/** 全ての Store の基底クラス */
export abstract class BaseStore<
  TProps extends BaseStoreProperties = BaseStoreProperties,
  TActions extends BaseStoreActions = BaseStoreActions
> {
  
  /** プロパティをリセット */
  protected reset(set: any): Reset {
    return () => set(this.buildDefaultProperties(), false, 'reset');
  }

  /** デフォルトプロパティを構築
   *
   * 子クラスで override */
  protected buildDefaultProperties(): TProps {
    return {} as TProps;
  }

  /** アクションを構築
   *
   * 子クラスで override */
  protected buildActions(
    set: StoreApi<TProps & BaseStoreActions & TActions>['setState'],
    get: StoreApi<TProps & BaseStoreActions & TActions>['getState']
  ): TActions {
    return {
      reset: this.reset(set),
    } as TActions;
  }

  /** ストア生成: テンプレートメソッド */
  createStore(
    set: StoreApi<TProps & BaseStoreActions & TActions>['setState'],
    get: StoreApi<TProps & BaseStoreActions & TActions>['getState']
  ): TProps & BaseStoreActions & TActions {
    return {
      ...this.buildDefaultProperties(),
      ...this.buildActions(set, get),
    };
  }
}
