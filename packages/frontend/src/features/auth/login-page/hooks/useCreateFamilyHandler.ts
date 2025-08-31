import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LanguageTypeValue } from '../../../../../../backend/src/features/language/value-object/languageTypeValue';

/** 新規ユーザー作成ハンドラーのカスタムフック
 * 
 * 新規ユーザー作成画面への遷移を行う */
export const useCreateUserHandler = (params: {
  languageType: LanguageTypeValue
}) => {
  const navigation = useNavigation();
  
  return useCallback((): void => {
    // 新規ユーザ作成画面への遷移
    console.log('新規ユーザ作成画面への遷移');
    navigation.navigate('CreateUser' as never);
    Alert.alert(
      "新規ユーザー作成",
      "新規登録画面へ遷移します。",
    );
  }, [params.languageType, navigation]);
};
