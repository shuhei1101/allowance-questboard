import { useEffect } from 'react';
import { fetchRoleSelectData } from '../services/fetchRoleSelectData';
import { LoginRouter } from '@backend/features/auth/router/loginRouter';
import { RoleSelectData } from '../models/roleSelectData';

/** ロール選択データ初期化フック
 *
 * JWTトークンを使用してloginRouter.loginを呼び出し、
 * ユーザーに紐づく家族・親・子情報を取得してstoreに設定する */
export const useRoleSelectDataInitializer = (params: {
  loginRouter: LoginRouter,
  setRoleSelectData: (roleSelectData: RoleSelectData) => void,
  setLoading: (isLoading: boolean) => void,
}) => {
  useEffect(() => {
    const initializeRoleSelectData = async () => {
      params.setLoading(true);
      try {
        const roleSelectData = await fetchRoleSelectData({
          loginRouter: params.loginRouter,
        });
        params.setRoleSelectData(roleSelectData);
      } catch (error) {
        console.error('ロール選択データの取得に失敗しました:', error);
        throw error;
      } finally {
        params.setLoading(false);
      }
    };
    
    initializeRoleSelectData();
  }, []);
};
