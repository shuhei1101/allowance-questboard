import { Alert } from 'react-native';
import { useTranslation } from '@/core/i18n/useTranslation';

/**
 * 利用規約ハンドラー
 * 
 * 利用規約画面への遷移を行う
 */
export const handleTermsOfService = (): void => {
  const { t } = useTranslation();
  
  // TODO: React Navigationの実装
  console.log('利用規約画面への遷移');
  Alert.alert(t('common.confirm'), t('login.navigation.termsOfService'));
};
