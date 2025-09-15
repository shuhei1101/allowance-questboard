import { useCallback } from 'react';
import { Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LanguageTypeValue } from '../../../../../../../backend/src/features/language/value-object/languageTypeValue';
import { AuthStackMeta, AuthStackParamList } from '../../../AuthNavigator';

/** 新規ユーザー作成ハンドラーのカスタムフック
 * 
 * 新規ユーザー作成画面への遷移を行う */
export const useRegisterUserHandler = (params: {
  languageType: LanguageTypeValue
}) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return useCallback((): void => {
    // 新規ユーザ作成画面への遷移
    navigation.navigate(AuthStackMeta.screens.userRegister);
  }, [params.languageType, navigation]);
};
