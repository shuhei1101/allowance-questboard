import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconSelectPage, IconSelectPageProps } from '../icon/icon-select-page/IconSelectPage';
import { LoadingPage } from './loading-page/LoadingPage';

export const CommonStackMeta = {
  name: 'Common',
  screens: {
    iconSelect: "IconSelect",
    loading: "Loading",
  },
} as const;

// 共通機能のナビゲーションパラメータ型定義
export type CommonStackParamList = {
  IconSelect: IconSelectPageProps;
  Loading: { message?: string };
};

const CommonStack = createStackNavigator<CommonStackParamList>();

/**
 * アイコン選択ページのラッパー
 */
const IconSelectPageWrapper: React.FC<{ route: any }> = ({ route }) => {
  const { initialSelectedIcon, onIconSelected } = route.params || {};

  return (
    <IconSelectPage
      initialSelectedIcon={initialSelectedIcon}
      onIconSelected={onIconSelected}
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
      initialRouteName={CommonStackMeta.screens.loading}
      screenOptions={{
        headerShown: true,
      }}
    >
      <CommonStack.Screen 
        name={CommonStackMeta.screens.iconSelect} 
        component={IconSelectPageWrapper}
        options={{
          headerTitle: 'アイコン選択',
        }}
      />
      <CommonStack.Screen 
        name={CommonStackMeta.screens.loading} 
        component={LoadingPageWrapper}
        options={{
          headerShown: false,
        }}
      />
    </CommonStack.Navigator>
  );
}
