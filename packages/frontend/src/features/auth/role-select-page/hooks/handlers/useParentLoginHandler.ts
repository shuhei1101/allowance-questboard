import { useCallback } from 'react';
import { useAppNavigation } from '../../../../../../AppNavigator';
import { UpdateFamilyMemberType } from '../../../../../core/constants/sessionStore';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

/**
 * 親ログインハンドラーのカスタムフック
 * 
 * 親としてログインし、親用ホーム画面へ遷移する
 */
export const useParentLoginHandler = (params: {
  updateFamilyMemberType: UpdateFamilyMemberType;
}) => {
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    try {
      // 家族メンバータイプを親に設定
      params.updateFamilyMemberType(FamilyMemberType.PARENT);

      // 親用ホーム画面への遷移
      console.log('親用ホーム画面への遷移');
      // TODO: 親用ホーム画面を実装したら、そちらに遷移するように修正する
    } catch (error) {
      console.error('親ログインエラー:', error);
    }
  }, [params.updateFamilyMemberType, navigation]);
};
