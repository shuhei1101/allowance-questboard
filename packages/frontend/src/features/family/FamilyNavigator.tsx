import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { FamilyRegisterPage, FamilyRegisterPageProps } from './family-register-page/FamilyRegisterPage';
import { ComfirmButton } from '@/features/shared/components/ComfirmButton';

export const FamilyStackMeta = {
  name: 'Family',
  screens: {
    familyRegister: 'FamilyRegister',
  },
} as const;

// 家族関連のナビゲーションパラメータ型定義
export type FamilyStackParamList = {
  FamilyRegister: FamilyRegisterPageProps;
};

const FamilyStack = createStackNavigator<FamilyStackParamList>();

// FamilyRegisterPageのラッパーコンポーネント
const FamilyRegisterPageWrapper: React.FC = () => {
  const route = useRoute<RouteProp<FamilyStackParamList, 'FamilyRegister'>>();
  const navigation = useNavigation();

  // 確定ボタンのハンドラー
  const handleSubmit = () => {
    Alert.alert('登録完了', '家族登録が完了しました');
    // 実際の実装では、route.paramsのonSubmitを呼び出す
    // route.params?.onSubmit?.();
  };

  // ヘッダーの確定ボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComfirmButton
          onPress={handleSubmit}
          disabled={false} // 実際の実装では、フォームのバリデーション状態を使用
          loading={false}  // 実際の実装では、ローディング状態を使用
          variant="header"
        />
      ),
    });
  }, [navigation, handleSubmit]);

  return <FamilyRegisterPage {...route.params} />;
};

/** 家族関連のナビゲーター
 *
 * 家族登録画面や家族編集画面を管理 */
export function FamilyNavigator() {
  return (
    <FamilyStack.Navigator
      initialRouteName={FamilyStackMeta.screens.familyRegister}
      screenOptions={{
        headerShown: true,
      }}
    >
      <FamilyStack.Screen
        name={FamilyStackMeta.screens.familyRegister}
        component={FamilyRegisterPageWrapper}
        options={{
          title: '新規家族作成',
        }}
      />
    </FamilyStack.Navigator>
  );
}
