import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { DemoTopPage } from './demo-top-page/DemoTopPage';
import { ScreenListPage } from './screen-list-page/ScreenListPage';
import { ComponentListPage } from './component-list-page/ComponentListPage';
import { DemoComponentNavigator, DemoComponentStackParamList } from './component-list-page/DemoComponentNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export const DemoStackMeta = {
  name: 'Demo',
  screens: {
    demoTop: "DemoTop",
    screenList: "ScreenList",
    componentList: "ComponentList",
    demoComponent: "DemoComponent",
  },
} as const;

// Demo Navigation Types
export type DemoStackParamList = {
  DemoTop: undefined;
  ScreenList: undefined;
  ComponentList: undefined;
  DemoComponent: NavigatorScreenParams<DemoComponentStackParamList>;
};

const DemoStack = createStackNavigator<DemoStackParamList>();

/**
 * デモナビゲーター
 * 開発中の画面やコンポーネントを確認するためのデモ環境
 * 
 * 機能:
 * - 各ページの表示確認
 * - コンポーネントの単体確認
 * - モック状態での動作確認
 */
export function DemoNavigator() {
  return (
    <DemoStack.Navigator
      id={undefined}
      initialRouteName={DemoStackMeta.screens.demoTop}
    >
      <DemoStack.Screen 
        name={DemoStackMeta.screens.demoTop}
        component={DemoTopPage}
        options={{ title: '🏠 開発用トップ' }}
      />
      <DemoStack.Screen 
        name={DemoStackMeta.screens.screenList}
        component={ScreenListPage}
        options={{ title: '📱 画面一覧' }}
      />
      <DemoStack.Screen 
        name={DemoStackMeta.screens.componentList}
        component={ComponentListPage}
        options={{ title: '🧩 コンポーネント一覧' }}
      />
      <DemoStack.Screen 
        name={DemoStackMeta.screens.demoComponent}
        component={DemoComponentNavigator}
      />
    </DemoStack.Navigator>
  );
};
