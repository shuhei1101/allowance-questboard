import { useCallback } from 'react';
import { Alert } from 'react-native';

/**
 * アイコン選択ハンドラーのカスタムフック
 * 
 * アイコン選択画面への遷移を行う
 */
export const useIconSelectHandler = () => {
  return useCallback((): void => {
    // 一旦はメッセージ表示のみ
    Alert.alert('アイコン選択', 'アイコン選択画面へ遷移');
  }, []);
};
