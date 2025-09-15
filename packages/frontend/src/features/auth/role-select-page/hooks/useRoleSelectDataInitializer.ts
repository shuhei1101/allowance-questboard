import { useEffect } from 'react';
import { useRoleSelectPageStore } from '../stores/roleSelectPageStore';
import { fetchRoleSelectData } from '../services/fetchRoleSelectData';

/**
 * ロール選択データ初期化フック
 * 
 * ページ表示時にログイン後のデータを取得する
 */
export const useRoleSelectDataInitializer = () => {
  const pageStore = useRoleSelectPageStore();

  useEffect(() => {
    const initializeRoleSelectData = async () => {
      try {
        pageStore.setLoading(true);
        const roleSelectData = await fetchRoleSelectData();
        pageStore.setRoleSelectData(roleSelectData);
      } catch (error) {
        console.error('ロール選択データの取得に失敗しました:', error);
        // TODO: エラーハンドリングを実装
      } finally {
        pageStore.setLoading(false);
      }
    };

    initializeRoleSelectData();
  }, []); // 初回のみ実行
};
