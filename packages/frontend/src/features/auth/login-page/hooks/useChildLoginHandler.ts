import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HideDialog, SetLoginForm, SetLoading } from '../loginPageStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { LoginForm } from '../models/loginForm';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';
import { SetFamilyMemberType } from '../../../../core/constants/sessionVariables';
import { useAppNavigation } from '../../../../../AppNavigator';

/**
 * 子供ログインハンドラーのカスタムフック
 * 
 * 子供としてログインし、子供用ホーム画面へ遷移する
 */
export const useChildLoginHandler = (params: {
  updateFamilyMemberType: SetFamilyMemberType,
  hideDialog: HideDialog,
  setLoginForm: SetLoginForm,
  setLoading: SetLoading
}) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    try {
      // 家族メンバータイプの設定
      params.updateFamilyMemberType(FamilyMemberType.CHILD);

      // ダイアログを閉じる
      params.hideDialog();
      
      // ログイン状態をリセット
      params.setLoginForm(LoginForm.initialize());
      params.setLoading(false);

      // 子供用ホーム画面への遷移
      console.log('子供用ホーム画面への遷移');
      // TODO: 子供用ホーム画面を実装したら、そちらに遷移するように修正する
      Alert.alert(t('common.success'), t('auth.loginPage.success.childLogin'));
    } catch (error) {
      console.error('子供ログインエラー:', error);
      Alert.alert(t('common.error'), t('auth.loginPage.errors.childLoginFailed'));
    }
  }, [params.updateFamilyMemberType, params.hideDialog, params.setLoginForm, params.setLoading, t, navigation]);
};
