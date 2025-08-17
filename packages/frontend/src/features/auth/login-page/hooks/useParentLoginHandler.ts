import { useCallback } from 'react';
import { Alert } from 'react-native';
import { HideDialog, UpdateLoginForm, SetLoading } from '../stores/loginPageStore';
import { UpdateFamilyMemberType } from '@/features/auth/stores/sessionStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { LoginForm } from '../models/loginForm';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

/**
 * 親ログインハンドラーのカスタムフック
 * 
 * 親としてログインし、親用ホーム画面へ遷移する
 */
export const useParentLoginHandler = (params: {
  updateFamilyMemberType: UpdateFamilyMemberType,
  hideDialog: HideDialog,
  updateLoginForm: UpdateLoginForm,
  setLoading: SetLoading
}) => {
  const { t } = useTranslation();
  
  return useCallback((): void => {
    try {
      // 家族メンバータイプの設定
      params.updateFamilyMemberType(FamilyMemberType.PARENT);

      // ダイアログを閉じる
      params.hideDialog();
      
      // ログイン状態をリセット
      params.updateLoginForm(LoginForm.initialize());
      params.setLoading(false);

      // TODO: 親用ホーム画面への遷移
      console.log('親用ホーム画面への遷移');
      Alert.alert(t('common.success'), t('auth.loginPage.success.parentLogin'));
    } catch (error) {
      console.error('親ログインエラー:', error);
      Alert.alert(t('common.error'), t('auth.loginPage.errors.parentLoginFailed'));
    }
  }, [params.updateFamilyMemberType, params.hideDialog, params.updateLoginForm, params.setLoading, t]);
};
