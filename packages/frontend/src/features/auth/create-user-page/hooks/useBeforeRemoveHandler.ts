import { useCallback } from 'react';
import { Alert } from 'react-native';
import { UserRegisterForm } from '../models/userRegisterForm';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useAppNavigation } from '../../../../../AppNavigator';

/** 戻るボタン押下時の確認処理ハンドラーのカスタムフック
 *
 * フォームに入力値がある場合に確認ダイアログを表示し、戻る処理をインターセプトする */
export const useBeforeRemoveHandler = (params: {
  userRegisterForm: UserRegisterForm
}) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  return useCallback((e: any) => {
    if (!params.userRegisterForm.hasInput()) {
      // 入力値がない場合はそのまま戻る
      return;
    }

    // 戻る処理を一旦阻止
    e.preventDefault();

    Alert.alert(
      t('auth.createUser.confirmBackTitle'),
      t('auth.createUser.confirmBackMessage'),
      [
        {
          text: t('common.cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('common.discard'),
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  }, [params.userRegisterForm, t, navigation]);
};
