import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { FamilyRegisterPage, FamilyRegisterPageProps } from './family-register-page/FamilyRegisterPage';

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

/** FamilyRegisterPageラッパー */
const FamilyRegisterPageWrapper: React.FC = () => {
  const route = useRoute<RouteProp<FamilyStackParamList, typeof FamilyStackMeta.screens.familyRegister>>();
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
