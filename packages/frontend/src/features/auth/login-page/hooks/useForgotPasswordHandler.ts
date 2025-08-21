import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { useSessionStore } from '../../stores/sessionStore';

/**
 * パスワードリセットハンドラーのカスタムフック
 * 
 * パスワードリセット画面への遷移を行う
 */
export const useForgotPasswordHandler = () => {
  const { languageType: languageType } = useSessionStore();
  const navigation = useNavigation();
  
  return useCallback((): void => {
    // パスワードリセット画面への遷移
    console.log('パスワードリセット画面への遷移');
    navigation.navigate('PasswordReset' as never);
    Alert.alert(
      AuthErrorMessages.forgotPasswordTitle().getMessage(languageType),
      AuthErrorMessages.forgotPasswordMessage().getMessage(languageType)
    );
  }, [languageType, navigation]);
};
