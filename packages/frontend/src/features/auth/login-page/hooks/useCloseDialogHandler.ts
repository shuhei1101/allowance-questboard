import { useCallback } from 'react';
import { HideDialog } from '../stores/loginPageStore';

/**
 * ダイアログクローズハンドラーのカスタムフック
 * 
 * ダイアログを閉じる
 */
export const useCloseDialogHandler = (params: {
  hideDialog: HideDialog
}) => {
  return useCallback((): void => {
    params.hideDialog();
  }, [params.hideDialog]);
};
