import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { IconSelectPage } from '../icon/icon-select-page/IconSelectPage';
import { LoadingPage } from './loading-page/LoadingPage';
import { Icon } from '@backend/features/icon/domain/icon';

export const StackInfo = {
  name: 'Common',
  screens: {
    iconSelect: "IconSelect",
    loading: "Loading",
  },
} as const;

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
 * アイコン選択ページのラッパー
 */
const IconSelectPageWrapper: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { initialSelectedIcon } = route.params || {};

  const handleIconSelected = (icon: Icon) => {
    Alert.alert('アイコン選択', `${icon} が選択されました`);
  };

  return (
    <IconSelectPage
      initialSelectedIcon={initialSelectedIcon}
      onIconSelected={handleIconSelected}
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
      initialRouteName={StackInfo.screens.loading}
      screenOptions={{
        headerShown: true,
      }}
      {...({} as any)}
    >
      <CommonStack.Screen 
        name={StackInfo.screens.iconSelect} 
        component={IconSelectPageWrapper}
        options={{
          headerTitle: 'アイコン選択',
        }}
      />
      <CommonStack.Screen 
        name={StackInfo.screens.loading} 
        component={LoadingPageWrapper}
        options={{
          headerShown: false,
        }}
      />
    </CommonStack.Navigator>
  );
}
