import { useCallback } from 'react';
import { Alert } from 'react-native';
import { HideDialog, SetLoading, UpdateLoginForm } from '../stores/loginPageStore';
import { UpdateFamilyMemberType } from '@/features/auth/stores/sessionStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { LoginForm } from '../models/loginForm';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

/**
 * 子供ログインハンドラーのカスタムフック
 * 
 * 子供としてログインし、子供用ホーム画面へ遷移する
 */
export const useChildLoginHandler = (params: {
  updateFamilyMemberType: UpdateFamilyMemberType,
  hideDialog: HideDialog,
  updateLoginForm: UpdateLoginForm,
  setLoading: SetLoading
}) => {
  const { t } = useTranslation();
  
  return useCallback((): void => {
    try {
      // 家族メンバータイプの設定
      params.updateFamilyMemberType(FamilyMemberType.CHILD);

      // ダイアログを閉じる
      params.hideDialog();
      
      // ログイン状態をリセット
      params.updateLoginForm(LoginForm.initialize());
      params.setLoading(false);

      // TODO: 子供用ホーム画面への遷移
      console.log('子供用ホーム画面への遷移');
      Alert.alert(t('common.success'), t('auth.loginPage.success.childLogin'));
    } catch (error) {
      console.error('子供ログインエラー:', error);
      Alert.alert(t('common.error'), t('auth.loginPage.errors.childLoginFailed'));
    }
  }, [params.updateFamilyMemberType, params.hideDialog, params.updateLoginForm, params.setLoading, t]);
};
