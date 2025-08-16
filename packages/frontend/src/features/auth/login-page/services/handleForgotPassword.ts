import { Alert } from 'react-native';
import { useTranslation } from '@/core/i18n/useTranslation';

/**
 * パスワードリセットハンドラー
 * 
 * パスワードリセット画面への遷移を行う
 */
export const handleForgotPassword = (): void => {
  const { t } = useTranslation();
  
  // TODO: React Navigationの実装
  console.log('パスワードリセット画面への遷移');
  Alert.alert(t('common.confirm'), t('login.navigation.forgotPassword'));
};
