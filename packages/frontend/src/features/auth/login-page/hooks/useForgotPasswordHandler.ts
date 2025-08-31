import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { LanguageTypeValue } from '../../../../../../backend/src/features/language/value-object/languageTypeValue';

/**
 * パスワードリセットハンドラーのカスタムフック
 * 
 * パスワードリセット画面への遷移を行う
 */
export const useForgotPasswordHandler = (params: {
  languageType: LanguageTypeValue
}) => {
  const navigation = useNavigation();
  
  return useCallback((): void => {
    // パスワードリセット画面への遷移
    console.log('パスワードリセット画面への遷移');
    navigation.navigate('PasswordReset' as never);
    Alert.alert(
      AuthErrorMessages.forgotPasswordTitle().getMessage(params.languageType),
      AuthErrorMessages.forgotPasswordMessage().getMessage(params.languageType)
    );
  }, [params.languageType, navigation]);
};
