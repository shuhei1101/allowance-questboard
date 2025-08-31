import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { LanguageTypeValue } from '../../../../../../backend/src/features/language/value-object/languageTypeValue';

/**
 * 新規家族作成ハンドラーのカスタムフック
 * 
 * 新規家族作成画面への遷移を行う
 */
export const useCreateFamilyHandler = (params: {
  languageType: LanguageTypeValue
}) => {
  const navigation = useNavigation();
  
  return useCallback((): void => {
    // 新規家族作成画面への遷移
    console.log('新規家族作成画面への遷移');
    navigation.navigate('CreateFamily' as never);
    Alert.alert(
      AuthErrorMessages.createFamilyTitle().getMessage(params.languageType),
      AuthErrorMessages.createFamilyMessage().getMessage(params.languageType)
    );
  }, [params.languageType, navigation]);
};
