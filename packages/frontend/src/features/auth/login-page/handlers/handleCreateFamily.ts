import { Alert } from 'react-native';
import { useTranslation } from '@/core/i18n/useTranslation';

/**
 * 新規家族作成ハンドラー
 * 
 * 新規家族作成画面への遷移を行う
 */
export const handleCreateFamily = (): void => {
  const { t } = useTranslation();
  
  // TODO: React Navigationの実装
  console.log('新規家族作成画面への遷移');
  Alert.alert(t('common.confirm'), t('login.navigation.createFamily'));
};
