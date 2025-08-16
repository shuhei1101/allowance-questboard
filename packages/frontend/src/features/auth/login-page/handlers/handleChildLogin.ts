import { Alert } from 'react-native';
import { useLoginPageStore } from '../stores/loginPageStore';
import { useSessionStore } from '@/features/auth/shared/stores/sessionStore';
import { useTranslation } from '@/core/i18n/useTranslation';
import { LoginForm } from '../models/loginForm';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

/**
 * 子供ログインハンドラー
 * 
 * 子供としてログインし、子供用ホーム画面へ遷移する
 */
export const handleChildLogin = (): void => {
  const sessionStore = useSessionStore();
  const pageStore = useLoginPageStore();
  const { t } = useTranslation();
  
  try {
    // 家族メンバータイプの設定
    sessionStore.updateFamilyMemberType(FamilyMemberType.CHILD);

    // ダイアログを閉じる
    pageStore.hideDialog();
    
    // ログイン状態をリセット
    pageStore.updateLoginForm(LoginForm.initialize());
    pageStore.setLoading(false);

    // TODO: 子供用ホーム画面への遷移
    console.log('子供用ホーム画面への遷移');
    Alert.alert(t('common.success'), t('login.success.childLogin'));
  } catch (error) {
    console.error('子供ログインエラー:', error);
    Alert.alert(t('common.error'), t('login.errors.childLoginFailed'));
  }
};
