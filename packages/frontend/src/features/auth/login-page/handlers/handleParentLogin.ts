import { Alert } from 'react-native';
import { useLoginPageStore } from '../stores/loginPageStore';
import { useSessionStore } from '@/features/auth/shared/stores/sessionStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { LoginForm } from '../models/loginForm';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

/**
 * 親ログインハンドラー
 * 
 * 親としてログインし、親用ホーム画面へ遷移する
 */
export const handleParentLogin = (): void => {
  const sessionStore = useSessionStore();
  const pageStore = useLoginPageStore();
  const { t } = useTranslation();
  
  try {
    // TODO: 家族メンバータイプの設定（後で実装）
    sessionStore.updateFamilyMemberType(FamilyMemberType.PARENT);

    // ダイアログを閉じる
    pageStore.hideDialog();
    
    // ログイン状態をリセット
    pageStore.updateLoginForm(LoginForm.initialize());
    pageStore.setLoading(false);

    // TODO: 親用ホーム画面への遷移
    console.log('親用ホーム画面への遷移');
    Alert.alert(t('common.success'), t('login.success.parentLogin'));
  } catch (error) {
    console.error('親ログインエラー:', error);
    Alert.alert(t('common.error'), t('login.errors.parentLoginFailed'));
  }
};
