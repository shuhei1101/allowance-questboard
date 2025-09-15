import { useEffect } from 'react';
import { fetchRoleSelectData } from '../../services/fetchRoleSelectData';
import { LoginRouter } from '@backend/features/auth/router/loginRouter';
import { SetRoleSelectData } from '../../stores/roleSelectPageStore';

interface UseRoleSelectDataInitializerParams {
  /** loginRouter */
  loginRouter?: LoginRouter;
  /** ロール選択データ設定関数 */
  setRoleSelectData: SetRoleSelectData;
}

/** ロール選択データ初期化フック
 *
 * JWTトークンを使用してloginRouter.loginを呼び出し、
 * ユーザーに紐づく家族・親・子情報を取得してstoreに設定する */
export const useRoleSelectDataInitializer = (params: UseRoleSelectDataInitializerParams) => {
  useEffect(() => {
    const initializeRoleSelectData = async () => {
      if (!params.loginRouter) return;
      
      try {
        const roleSelectData = await fetchRoleSelectData({
          loginRouter: params.loginRouter,
        });
        params.setRoleSelectData(roleSelectData);
      } catch (error) {
        console.error('ロール選択データの取得に失敗しました:', error);
        // エラーは ErrorBoundary に委譲
        throw error;
      }
    };
    
    initializeRoleSelectData();
  }, [params.loginRouter, params.setRoleSelectData]);
};
