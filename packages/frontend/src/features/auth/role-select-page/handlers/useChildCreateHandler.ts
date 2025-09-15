import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from '@/core/i18n/useTranslation';

/**
 * 子供作成ハンドラーのカスタムフック
 * 
 * 子供作成機能の未実装を通知する
 */
export const useChildCreateHandler = () => {
  const { t } = useTranslation();
  
  return useCallback((): void => {
    // 子供作成機能の未実装を通知
    Alert.alert(t('common.notice'), '子供作成機能は未実装です');
  }, [t]);
};
