import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from '@/core/i18n/useTranslation';

/**
 * 家族参加ハンドラーのカスタムフック
 * 
 * 家族参加時のロール選択ダイアログを表示する
 */
export const useFamilyJoinHandler = () => {
  const { t } = useTranslation();
  
  return useCallback((): void => {
    // ロール選択ダイアログを表示
    Alert.alert(
      'ロール選択',
      '親と子どちらで参加しますか？',
      [
        {
          text: '親',
          onPress: () => {
            // 親ユーザ作成画面へ遷移（未実装）
            Alert.alert(t('common.notice'), '親ユーザ作成画面への遷移は未実装です');
          },
        },
        {
          text: '子',
          onPress: () => {
            // 家族コード入力画面へ遷移（未実装）
            Alert.alert(t('common.notice'), '家族コード入力画面への遷移は未実装です');
          },
        },
        {
          text: 'キャンセル',
          style: 'cancel',
        },
      ]
    );
  }, [t]);
};
