import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { useSessionStore } from '../../stores/sessionStore';

/**
 * 利用規約ハンドラーのカスタムフック
 * 
 * 利用規約画面への遷移を行う
 */
export const useTermsOfServiceHandler = () => {
  const { languageType } = useSessionStore();
  const navigation = useNavigation();
  
  return useCallback((): void => {
    // 利用規約画面への遷移
    console.log('利用規約画面への遷移');
    navigation.navigate('TermsOfService' as never);
    Alert.alert(
      AuthErrorMessages.termsOfServiceTitle().getMessage(languageType),
      AuthErrorMessages.termsOfServiceMessage().getMessage(languageType)
    );
  }, [languageType, navigation]);
};
