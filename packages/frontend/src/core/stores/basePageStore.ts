import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';

// シグネチャ
export type SetLoading = (loading: boolean) => void;

export interface BasePageProperties extends BaseStoreProperties {
  isLoading: boolean;
}

export interface BasePageActions extends BaseStoreActions {
  setLoading: SetLoading;
}

export abstract class BasePageStore<
  TProps extends BasePageProperties = BasePageProperties,
  TActions extends BasePageActions = BasePageActions
> extends BaseStore<
  TProps,
  TActions
> {

  /** ローディング状態を設定 */
  protected setLoading(set: any): SetLoading {
    return (loading: boolean) => set({ isLoading: loading }, false, 'setLoading');
  }


  protected buildDefaultProperties(): TProps {
    return {
      ...super.buildDefaultProperties(),
      isLoading: false,
    };
  }

  protected buildActions(
    set: StoreApi<TProps & BasePageActions & TActions>['setState']
  ): TActions {
    return {
      ...super.buildActions(set),
      setLoading: this.setLoading(set),
    } as TActions;
  }
}
