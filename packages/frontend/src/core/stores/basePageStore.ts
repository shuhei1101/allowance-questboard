import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';
import { JwtStorage } from '../../features/auth/services/jwtStorage';
import { useEffect } from 'react';

// シグネチャ
export type SetLoading = (loading: boolean) => void;
export type LoadToken = () => Promise<void>;
export type Jwt = string | undefined;

export interface BasePageProperties extends BaseStoreProperties {
  isLoading: boolean;
  jwt: Jwt;
}

export interface BasePageActions extends BaseStoreActions {
  setLoading: SetLoading;
  loadToken: LoadToken;
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

  /** JWTトークンを取得してストアに保存 */
  protected loadToken(set: any): LoadToken {
    return async () => {
      set({ isLoading: true }, false, 'loadToken:start');
      try {
        const token = await JwtStorage.getToken();
        set({ jwt: token }, false, 'loadToken:success');
      } catch (error) {
        console.error('JWT取得エラー:', error);
        set({ jwt: undefined }, false, 'loadToken:error');
      } finally {
        set({ isLoading: false }, false, 'loadToken:end');
      }
    };
  }


  protected buildDefaultProperties(): TProps {
    return {
      ...super.buildDefaultProperties(),
      isLoading: false,
      jwt: undefined,
    };
  }

  protected buildActions(
    set: StoreApi<TProps & BasePageActions & TActions>['setState'],
    get: StoreApi<TProps & BasePageActions & TActions>['getState']
  ): TActions {
    return {
      ...super.buildActions(set, get),
      setLoading: this.setLoading(set),
      loadToken: this.loadToken(set),
    } as TActions;
  }
}

/** 初回画面表示時のトークン読み込み */
export const useLoadToken = <T extends BasePageProperties & BasePageActions>(
  store:  T
) => {
  const jwt = store.jwt;
  const isLoading = store.isLoading;
  const loadToken = store.loadToken;

  // 初期表示で JWT を取得
  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return { jwt, isLoading };
};
