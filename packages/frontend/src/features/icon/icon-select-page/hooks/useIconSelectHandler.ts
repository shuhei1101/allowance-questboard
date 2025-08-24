import { useCallback } from 'react';
import { Icon } from '@backend/features/icon/domain/icon';

/**
 * アイコン選択ハンドラーのカスタムフック
 * 
 * アイコンを選択して状態に保存する
 */
export const useIconSelectHandler = (params: {
  selectIcon: (icon: Icon) => void;
}) => {
  return useCallback((icon: Icon) => {
    params.selectIcon(icon);
  }, [params.selectIcon]);
};
