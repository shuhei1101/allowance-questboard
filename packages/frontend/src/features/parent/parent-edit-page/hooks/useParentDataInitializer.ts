import { useEffect } from 'react';
import { useParentEditPageStore } from '../stores/parentEditPageStore';
import { fetchParentForm } from '../services/fetchParentForm';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentRouter } from '@backend/features/parent/router/parentRouter';
import { GetAllIcons } from '@/features/shared/stores/appConfigStore';

/**
 * 親データ初期化フック
 */
export const useInitializeParentData = (
  parentId?: ParentId, 
  parentRouter?: ParentRouter,
  getAllIcons?: GetAllIcons
) => {
  const pageStore = useParentEditPageStore();

  useEffect(() => {
    const initializeParentData = async () => {
      if (!parentId || !parentRouter || !getAllIcons) return;
      try {
        const parentForm = await fetchParentForm({
          parentId,
          router: parentRouter,
          getAllIcons
        });
        pageStore.setParentForm(parentForm);
      } catch (error) {
        console.error('親情報の取得に失敗しました:', error);
      }
    };

    // 状態を初期化
    pageStore.reset();
    
    initializeParentData();
  }, [parentId, parentRouter, getAllIcons]); // getAllIconsも依存配列に追加
};
