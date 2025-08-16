import { useLoginPageStore } from '../stores/loginPageStore';

/**
 * ダイアログクローズハンドラー
 * 
 * ダイアログを閉じる
 */
export const handleCloseDialog = (): void => {
  const pageStore = useLoginPageStore();
  
  pageStore.hideDialog();
};
