import { useCallback } from 'react';
import { Alert } from 'react-native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { useSessionStore } from '../../stores/sessionStore';

/**
 * パスワードリセットハンドラーのカスタムフック
 * 
 * パスワードリセット画面への遷移を行う
 */
export const useForgotPasswordHandler = () => {
  const { languageType } = useSessionStore();
  
  return useCallback((): void => {
    // TODO: React Navigationの実装
    console.log('パスワードリセット画面への遷移');
    Alert.alert(
      AuthErrorMessages.forgotPasswordTitle().getMessage(languageType),
      AuthErrorMessages.forgotPasswordMessage().getMessage(languageType)
    );
  }, [languageType]);
};
