import { useCallback } from 'react';
import { Alert } from 'react-native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { useSessionStore } from '../../stores/sessionStore';

/**
 * 利用規約ハンドラーのカスタムフック
 * 
 * 利用規約画面への遷移を行う
 */
export const useTermsOfServiceHandler = () => {
  const { languageType } = useSessionStore();
  
  return useCallback((): void => {
    // TODO: React Navigationの実装
    console.log('利用規約画面への遷移');
    Alert.alert(
      AuthErrorMessages.termsOfServiceTitle().getMessage(languageType),
      AuthErrorMessages.termsOfServiceMessage().getMessage(languageType)
    );
  }, [languageType]);
};
