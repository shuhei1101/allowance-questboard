import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { ParentEditPage } from '@/features/parent/parent-edit-page/ParentEditPage';
import { DemoMockProvider } from './providers/DemoMockProvider';
import { ComponentShowcase } from './component-showcase-page/ComponentShowcase';
import { StoreInspector } from './store-inspector-page/StoreInspector';
import { DevelopmentTopPage } from './development-top-page/DevelopmentTopPage';
import { ScreenListPage } from './screen-list-page/ScreenListPage';
import { ComponentListPage } from './component-list-page/ComponentListPage';
import { ScreenLauncherPage } from './screen-launcher-page/ScreenLauncherPage';
import { ComponentDetailPage } from './component-detail-page/ComponentDetailPage';
import { SessionSettingsPage } from '../test-environment/SessionSettingsPage';
import { PageStateSettingsPage } from '../test-environment/PageStateSettingsPage';
import { LoginPageSettingsPage } from '../test-environment/LoginPageSettingsPage';
import { ParentEditPageSettingsPage } from '../test-environment/ParentEditPageSettingsPage';

// Demo Navigation Types
export type DemoStackParamList = {
  DevelopmentTop: undefined;
  ScreenList: undefined;
  ComponentList: undefined;
  ScreenLauncher: { screenType: string };
  ComponentDetail: { componentType: string };
  DemoLoginPage: undefined;
  DemoParentEditPage: undefined;
  ComponentShowcase: undefined;
  StoreInspector: undefined;
  SessionSettings: undefined;
  PageStateSettings: undefined;
  LoginPageSettings: undefined;
  ParentEditPageSettings: undefined;
  Main: undefined; // 通常起動用
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
export const DemoNavigator: React.FC = () => {
  return (
    <DemoMockProvider>
      <DemoStack.Navigator
        id={undefined}
        initialRouteName="DevelopmentTop"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#6366f1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <DemoStack.Screen 
          name="DevelopmentTop" 
          component={DevelopmentTopPage}
          options={{ title: '🏠 開発用トップ' }}
        />
        <DemoStack.Screen 
          name="ScreenList" 
          component={ScreenListPage}
          options={{ title: '📱 画面一覧' }}
        />
        <DemoStack.Screen 
          name="ComponentList" 
          component={ComponentListPage}
          options={{ title: '🧩 コンポーネント一覧' }}
        />
        <DemoStack.Screen 
          name="ScreenLauncher" 
          component={ScreenLauncherPage}
          options={{ title: '🚀 画面起動' }}
        />
        <DemoStack.Screen 
          name="ComponentDetail" 
          component={ComponentDetailPage}
          options={{ title: '🔍 コンポーネント詳細' }}
        />
        <DemoStack.Screen 
          name="DemoLoginPage" 
          component={DemoLoginPageScreen}
          options={{ title: '🔐 ログイン画面' }}
        />
        <DemoStack.Screen 
          name="DemoParentEditPage" 
          component={DemoParentEditPageScreen}
          options={{ title: '👤 親編集画面' }}
        />
        <DemoStack.Screen 
          name="ComponentShowcase" 
          component={ComponentShowcaseScreen}
          options={{ title: '🎨 コンポーネントショーケース' }}
        />
        <DemoStack.Screen 
          name="StoreInspector" 
          component={StoreInspectorScreen}
          options={{ title: '🔧 Store Inspector' }}
        />
        <DemoStack.Screen 
          name="SessionSettings" 
          component={SessionSettingsPage}
          options={{ title: '⚙️ セッション設定' }}
        />
        <DemoStack.Screen 
          name="PageStateSettings" 
          component={PageStateSettingsPage}
          options={{ title: '📝 ページ状態設定' }}
        />
        <DemoStack.Screen 
          name="LoginPageSettings" 
          component={LoginPageSettingsPage}
          options={{ title: '🔐 ログイン画面設定' }}
        />
        <DemoStack.Screen 
          name="ParentEditPageSettings" 
          component={ParentEditPageSettingsPage}
          options={{ title: '👤 親編集画面設定' }}
        />
      </DemoStack.Navigator>
    </DemoMockProvider>
  );
};

/**
 * ログイン画面のデモ
 */
const DemoLoginPageScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginPage />
    </View>
  );
};

/**
 * 親編集画面のデモ
 */
const DemoParentEditPageScreen: React.FC = () => {
  const handleConfirm = (parentData: any) => {
    console.log('🎯 Demo - Parent data confirmed:', parentData);
    // デモなので実際の処理は行わない
    alert('✅ 親情報が更新されました（デモ）');
  };

  return (
    <View style={{ flex: 1 }}>
      <ParentEditPage onConfirm={handleConfirm} />
    </View>
  );
};

/**
 * コンポーネントショーケース画面
 */
const ComponentShowcaseScreen: React.FC = () => {
  return <ComponentShowcase />;
};

/**
 * ストア状態検査画面
 */
const StoreInspectorScreen: React.FC = () => {
  return <StoreInspector />;
};
