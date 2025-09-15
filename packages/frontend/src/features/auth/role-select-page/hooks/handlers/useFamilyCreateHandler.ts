import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from '@/core/i18n/useTranslation';

/**
 * 家族作成ハンドラーのカスタムフック
 * 
 * 家族作成機能の未実装を通知する
 */
export const useFamilyCreateHandler = () => {
  const { t } = useTranslation();
  
  return useCallback((): void => {
    // 家族作成機能の未実装を通知
    Alert.alert(t('common.notice'), '家族作成機能は未実装です');
  }, [t]);
};
