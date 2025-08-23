import { useEffect } from 'react';
import { useParentEditPageStore } from '../stores/parentEditPageStore';
import { fetchParentForm } from '../services/fetchParentForm';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentRouter } from '@backend/features/parent/router/parentRouter';

/**
 * 親データ初期化フック
 */
export const useInitializeParentData = (parentId?: ParentId, parentRouter?: ParentRouter) => {
  const pageStore = useParentEditPageStore();

  useEffect(() => {
    const initializeParentData = async () => {
      if (!parentId || !parentRouter) return;
      try {
        const parentForm = await fetchParentForm({
          parentId,
          router: parentRouter
        });
        pageStore.setParentForm(parentForm);
      } catch (error) {
        console.error('親情報の取得に失敗しました:', error);
      }
    };

    // 状態を初期化
    pageStore.reset();
    
    initializeParentData();
  }, [parentId, parentRouter]); // parentRouterも依存配列に追加
};
