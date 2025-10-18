import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParentEditPage, ParentEditPageProps } from './parent-edit-page/ParentEditPage'
import { RouteProp, useRoute } from '@react-navigation/native';

export const ParentStackMeta = {
  name: 'Parent',
  screens: {
    parentEdit: 'ParentEdit',
  },
} as const;

// 親機能関連のナビゲーションパラメータ型定義
export type ParentStackParamList = {
  ParentEdit: ParentEditPageProps
};

const ParentStack = createStackNavigator<ParentStackParamList>();

/** 親情報編集画面ラッパー */
const ParentEditPageWrapper: React.FC = () => {
  const route = useRoute<RouteProp<ParentStackParamList, typeof ParentStackMeta.screens.parentEdit>>();
  return <ParentEditPage {...route.params} />;
}

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
        component={ParentEditPageWrapper}
      />
    </ParentStack.Navigator>
  );
}
