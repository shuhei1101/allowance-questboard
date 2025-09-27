import { useEffect } from 'react';
import { fetchParentForm } from '../../services/fetchParentForm';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentRouter } from '@backend/features/parent/router/parentRouter';
import { GetAllIcons } from '../../../../../core/constants/iconStore';
import { ParentForm } from '../../models/parentForm';
import { SetForm } from '../../../../../core/stores/baseFormStore';

/**
 * 親データ初期化フック
 */
export const useInitializeParentData = (params: {
  parentId?: ParentId,
  parentRouter?: ParentRouter,
  getAllIcons?: GetAllIcons,
  setParentForm: SetForm<ParentForm>
}) => {
  useEffect(() => {
    const initializeParentData = async () => {
      if (!params.parentId || !params.parentRouter || !params.getAllIcons) return;
      try {
        const parentForm = await fetchParentForm({
          parentId: params.parentId,
          router: params.parentRouter,
          getAllIcons: params.getAllIcons
        });
        params.setParentForm(parentForm);
      } catch (error) {
        console.error('親情報の取得に失敗しました:', error);
      }
    };
    initializeParentData();
  }, [params.parentId, params.parentRouter, params.getAllIcons]); // getAllIconsも依存配列に追加
};
