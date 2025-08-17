import { useCallback } from 'react';
import { Alert } from 'react-native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { useSessionStore } from '../../stores/sessionStore';

/**
 * 新規家族作成ハンドラーのカスタムフック
 * 
 * 新規家族作成画面への遷移を行う
 */
export const useCreateFamilyHandler = () => {
  const { languageType } = useSessionStore();
  
  return useCallback((): void => {
    // TODO: React Navigationの実装
    console.log('新規家族作成画面への遷移');
    Alert.alert(
      AuthErrorMessages.createFamilyTitle().getMessage(languageType),
      AuthErrorMessages.createFamilyMessage().getMessage(languageType)
    );
  }, [languageType]);
};
