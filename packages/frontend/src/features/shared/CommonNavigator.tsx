import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { IconSelectPage } from '../icon/icon-select-page/IconSelectPage';
import { LoadingPage } from './loading-page/LoadingPage';
import { IconName } from '@backend/features/icon/value-objects/iconName';

// 共通機能のナビゲーションパラメータ型定義
export type CommonStackParamList = {
  IconSelect: { 
    initialSelectedIcon?: string;
    onIconSelected: (iconName: string) => void;
    onBack: () => void;
  };
  Loading: { message?: string };
};

const CommonStack = createStackNavigator<CommonStackParamList>();

/**
 * アイコン選択画面のラッパー
 */
const IconSelectPageWrapper: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { initialSelectedIcon } = route.params || {};

  const handleIconSelected = (iconName: IconName) => {
    Alert.alert('アイコン選択', `${iconName} が選択されました`);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <IconSelectPage
      initialSelectedIcon={initialSelectedIcon}
      onIconSelected={handleIconSelected}
      onBack={handleBack}
    />
  );
};

/**
 * ローディング画面のラッパー
 */
const LoadingPageWrapper: React.FC<{ route: any }> = ({ route }) => {
  const { message } = route.params || {};
  return <LoadingPage message={message} />;
};

/**
 * 共通機能関連のナビゲーター
 * アイコン選択とローディング画面を管理
 */
export function CommonNavigator() {
  return (
    <CommonStack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: true,
      }}
      {...({} as any)}
    >
      <CommonStack.Screen 
        name="IconSelect" 
        component={IconSelectPageWrapper}
        options={{
          headerTitle: 'アイコン選択',
        }}
      />
      <CommonStack.Screen 
        name="Loading" 
        component={LoadingPageWrapper}
        options={{
          headerShown: false,
        }}
      />
    </CommonStack.Navigator>
  );
}
