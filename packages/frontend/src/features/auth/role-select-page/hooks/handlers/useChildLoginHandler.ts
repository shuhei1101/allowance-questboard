import { useCallback } from 'react';
import { useAppNavigation } from '../../../../../../AppNavigator';
import { SetFamilyMemberType } from '../../../../../core/constants/sessionStore';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

/**
 * 子供ログインハンドラーのカスタムフック
 * 
 * 子供としてログインし、子供用ホーム画面へ遷移する
 */
export const useChildLoginHandler = (params: {
  updateFamilyMemberType: SetFamilyMemberType;
}) => {
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    try {
      // 家族メンバータイプを子供に設定
      params.updateFamilyMemberType(FamilyMemberType.CHILD);

      // 子供用ホーム画面への遷移
      console.log('子供用ホーム画面への遷移');
      // TODO: 子供用ホーム画面を実装したら、そちらに遷移するように修正する
    } catch (error) {
      console.error('子供ログインエラー:', error);
    }
  }, [params.updateFamilyMemberType, navigation]);
};
