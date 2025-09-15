import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { LanguageTypeValue } from '../../../../../../../backend/src/features/language/value-object/languageTypeValue';
import { useAppNavigation } from '../../../../../../AppNavigator';

/**
 * パスワードリセットハンドラーのカスタムフック
 * 
 * パスワードリセット画面への遷移を行う
 */
export const useForgotPasswordHandler = (params: {
  languageType: LanguageTypeValue
}) => {
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    // パスワードリセット画面への遷移
    console.log('パスワードリセット画面への遷移');
    // TODO: パスワードリセット画面を実装したら、そちらに遷移するように修正する
    Alert.alert(
      AuthErrorMessages.forgotPasswordTitle().getMessage(params.languageType),
      AuthErrorMessages.forgotPasswordMessage().getMessage(params.languageType)
    );
  }, [params.languageType]);
};
