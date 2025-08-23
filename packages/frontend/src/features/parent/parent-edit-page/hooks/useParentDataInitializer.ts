import { useEffect } from 'react';
import { useParentEditPageStore } from '../stores/parentEditPageStore';
import { fetchParentForm } from '../query/fetchParentForm';
import { ParentId } from '@backend/features/parent/value-object/parentId';

/**
 * 親データ初期化フック
 */
export const useInitializeParentData = (parentId?: ParentId) => {
  const pageStore = useParentEditPageStore();

  useEffect(() => {
    const initializeParentData = async () => {
      if (!parentId) return;
      try {
        const parentForm = await fetchParentForm(parentId);
        pageStore.setParentForm(parentForm);
      } catch (error) {
        console.error('親情報の取得に失敗しました:', error);
      }
    };

    // 状態を初期化
    pageStore.reset();
    
    initializeParentData();
  }, [parentId, pageStore]);
};
