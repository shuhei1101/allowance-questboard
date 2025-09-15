import { useCallback } from 'react';
import { Alert } from 'react-native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { LanguageTypeValue } from '../../../../../../../backend/src/features/language/value-object/languageTypeValue';
import { useAppNavigation } from '../../../../../../AppNavigator';

/**
 * 利用規約ハンドラーのカスタムフック
 * 
 * 利用規約画面への遷移を行う
 */
export const useTermsOfServiceHandler = (params: {
  languageType: LanguageTypeValue
}) => {
  const navigation = useAppNavigation();
  
  return useCallback((): void => {
    // 利用規約画面への遷移
    console.log('利用規約画面への遷移');
    // TODO: 利用規約画面を実装したら、そちらに遷移するように修正する
    Alert.alert(
      AuthErrorMessages.termsOfServiceTitle().getMessage(params.languageType),
      AuthErrorMessages.termsOfServiceMessage().getMessage(params.languageType)
    );
  }, [params.languageType]);
};
