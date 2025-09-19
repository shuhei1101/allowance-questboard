import { useCallback } from 'react';
import { Icon } from '@backend/features/icon/domain/icon';
import { useNavigation } from '@react-navigation/native';
import { useAppNavigation } from '../../../../../../AppNavigator';

export type OnIconSelected = (icon: Icon) => void;

/**
 * 確定ボタンハンドラーのカスタムフック
 * 
 * 選択されたアイコンがある場合に確定処理を実行する
 */
export const useConfirmHandler = (params: {
  selectedIcon?: Icon;
  onIconSelected: OnIconSelected;
}) => {
  const navigation = useAppNavigation();

  return useCallback(() => {
    if (params.selectedIcon) {
      params.onIconSelected(params.selectedIcon);
    }
    // 前画面に戻る
    navigation.goBack();
  }, [params.selectedIcon, params.onIconSelected]);
};
