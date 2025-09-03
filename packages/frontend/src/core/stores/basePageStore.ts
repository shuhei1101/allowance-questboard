import { StoreApi } from 'zustand';
import { BaseStore, BaseStoreActions, BaseStoreProperties } from './BaseStore';
import { JwtStorage } from '../../features/auth/services/jwtStorage';

// シグネチャ
export type SetLoading = (loading: boolean) => void;
export type LoadToken = () => Promise<void>;

export interface BasePageProperties extends BaseStoreProperties {
  isLoading: boolean;
  jwt?: string;
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
    set: StoreApi<TProps & BasePageActions & TActions>['setState']
  ): TActions {
    return {
      ...super.buildActions(set),
      setLoading: this.setLoading(set),
      loadToken: this.loadToken(set),
    } as TActions;
  }
}

/** 初回画面表示時のトークン読み込み */
export const useLoadToken = (
  store: StoreApi<BasePageProperties & BasePageActions>
) => {
  const jwt = store((s) => s.jwt);
  const isLoading = store((s) => s.isLoading);
  const loadToken = store((s) => s.loadToken);

  // 初期表示で JWT を取得
  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return { jwt, isLoading };
};