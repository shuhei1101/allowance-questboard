import { useCallback } from 'react';
import { useAppNavigation } from '../../../../../../AppNavigator';
import { ParentStackMeta } from '../../../../parent/ParentNavigator';

/**
 * 親作成ハンドラーのカスタムフック
 * 
 * 親編集画面への遷移を行う
 */
export const useParentCreateHandler = () => {
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    // 親編集画面への遷移
    navigation.navigate(ParentStackMeta.name, { screen: ParentStackMeta.screens.parentEdit });
  }, [navigation]);
};
