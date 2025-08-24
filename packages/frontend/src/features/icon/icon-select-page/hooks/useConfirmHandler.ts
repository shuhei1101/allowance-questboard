import { useCallback } from 'react';
import { Icon } from '@backend/features/icon/domain/icon';

/**
 * 確定ボタンハンドラーのカスタムフック
 * 
 * 選択されたアイコンがある場合に確定処理を実行する
 */
export const useConfirmHandler = (params: {
  selectedIcon?: Icon;
  onIconSelected: (icon: Icon) => void;
}) => {
  return useCallback(() => {
    if (params.selectedIcon) {
      params.onIconSelected(params.selectedIcon);
    }
  }, [params.selectedIcon, params.onIconSelected]);
};
