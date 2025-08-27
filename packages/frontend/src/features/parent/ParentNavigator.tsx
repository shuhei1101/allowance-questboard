import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { ParentEditPage } from './parent-edit-page/ParentEditPage'

export const ParentStackMeta = {
  name: 'Parent',
  screens: {
    parentEdit: 'ParentEdit',
  },
} as const;

// 親機能関連のナビゲーションパラメータ型定義
export type ParentStackParamList = {
  ParentEdit: {
    shouldShowBackButton?: boolean;
  }
};

const ParentStack = createStackNavigator<ParentStackParamList>();

/**
 * 親機能関連のナビゲーター
 * 親編集画面を管理
 */
export function ParentNavigator() {
  return (
    <ParentStack.Navigator
      initialRouteName={ParentStackMeta.screens.parentEdit}
      screenOptions={{
        headerShown: true,
        headerTitle: '親情報編集',
      }}
      {...({} as any)}
    >
      <ParentStack.Screen 
        name={ParentStackMeta.screens.parentEdit}
        component={ParentEditPage} 
      />
    </ParentStack.Navigator>
  );
}
