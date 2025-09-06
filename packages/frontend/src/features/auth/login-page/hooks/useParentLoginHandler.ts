import { useCallback } from 'react';
import { Alert } from 'react-native';
import { HideDialog } from '../stores/loginPageStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { LoginForm } from '../models/loginForm';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';
import { SetFamilyMemberType } from '../../../../core/constants/sessionVariables';
import { useAppNavigation } from '../../../../../AppNavigator';
import { SetForm } from '../../../../core/stores/baseFormStore';
import { SetLoading } from '../../../../core/stores/basePageStore';

/**
 * 親ログインハンドラーのカスタムフック
 * 
 * 親としてログインし、親用ホーム画面へ遷移する
 */
export const useParentLoginHandler = (params: {
  updateFamilyMemberType: SetFamilyMemberType,
  hideDialog: HideDialog,
  setLoginForm: SetForm<LoginForm>,
  setLoading: SetLoading
}) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    try {
      // 家族メンバータイプの設定
      params.updateFamilyMemberType(FamilyMemberType.PARENT);

      // ダイアログを閉じる
      params.hideDialog();
      
      // ログイン状態をリセット
      params.setLoginForm(LoginForm.initialize());
      params.setLoading(false);

      // 親用ホーム画面への遷移
      console.log('親用ホーム画面への遷移');
      // TODO: 親用ホーム画面を実装したら、そちらに遷移するように修正する
      Alert.alert(t('common.success'), t('auth.loginPage.success.parentLogin'));
    } catch (error) {
      console.error('親ログインエラー:', error);
      Alert.alert(t('common.error'), t('auth.loginPage.errors.parentLoginFailed'));
    }
  }, [params.updateFamilyMemberType, params.hideDialog, params.setLoginForm, params.setLoading, t]);
};
