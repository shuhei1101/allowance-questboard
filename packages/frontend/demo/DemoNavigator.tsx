import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { ParentEditPage } from '@/features/parent/parent-edit-page/ParentEditPage';
import { DemoMockProvider } from './providers/DemoMockProvider';
import { ComponentShowcase } from './development/component-showcase-page/ComponentShowcase';
import { StoreInspector } from './development/store-inspector-page/StoreInspector';
import { DevelopmentTopPage } from './development/development-top-page/DevelopmentTopPage';
import { ScreenListPage } from './development/screen-list-page/ScreenListPage';
import { ComponentListPage } from './development/component-list-page/ComponentListPage';
import { ScreenLauncherPage } from './development/screen-launcher-page/ScreenLauncherPage';
import { ComponentDetailPage } from './development/component-detail-page/ComponentDetailPage';
import { DependencyComponentListPage } from './development/dependency-component-list-page/DependencyComponentListPage';
import { EmailInputDetailPage } from './development/component-details/email-input-detail-page/EmailInputDetailPage';
import { PasswordInputDetailPage } from './development/component-details/password-input-detail-page/PasswordInputDetailPage';
import { BirthdayInputDetailPage } from './development/component-details/birthday-input-detail-page/BirthdayInputDetailPage';
import { SaveButtonDetailPage } from './development/component-details/save-button-detail-page/SaveButtonDetailPage';
import { IconSelectButtonDetailPage } from './development/component-details/icon-select-button-detail-page/IconSelectButtonDetailPage';
import { IconSelectPageDetailPage } from './development/component-details/icon-select-page-detail/IconSelectPageDetailPage';
import { SessionSettingsPage } from './test-environment/SessionSettingsPage';
import { PageStateSettingsPage } from './test-environment/PageStateSettingsPage';
import { LoginPageSettingsPage } from './test-environment/LoginPageSettingsPage';
import { ParentEditPageSettingsPage } from './test-environment/ParentEditPageSettingsPage';
import { DemoStackInfo } from './constants/demoStackInfo';

// Demo Navigation Types
export type DemoStackParamList = {
  DevelopmentTop: undefined;
  ScreenList: undefined;
  ComponentList: undefined;
  ScreenLauncher: { screenType: string };
  ComponentDetail: { componentType: string };
  DependencyComponentList: { 
    components: Array<{
      id: string;
      name: string;
      icon: string;
      description: string;
    }>;
    screenTitle: string;
  };
  EmailInputDetail: undefined;
  PasswordInputDetail: undefined;
  BirthdayInputDetail: undefined;
  SaveButtonDetail: undefined;
  IconSelectButtonDetail: undefined;
  IconSelectPageDetail: undefined;
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
export function DemoNavigator() {
  return (
    <DemoMockProvider>
      <DemoStack.Navigator
        id={undefined}
        initialRouteName={DemoStackInfo.screens.developmentTop}
      >
        <DemoStack.Screen 
          name={DemoStackInfo.screens.developmentTop}
          component={DevelopmentTopPage}
          options={{ title: '🏠 開発用トップ' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.screenList}
          component={ScreenListPage}
          options={{ title: '📱 画面一覧' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.componentList}
          component={ComponentListPage}
          options={{ title: '🧩 コンポーネント一覧' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.screenLauncher}
          component={ScreenLauncherPage}
          options={{ title: '🚀 画面起動' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.componentDetail}
          component={ComponentDetailPage}
          options={{ title: '🔍 コンポーネント詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.dependencyComponentList}
          component={DependencyComponentListPage}
          options={{ title: '🧩 依存コンポーネント一覧' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.emailInputDetail}
          component={EmailInputDetailPage}
          options={{ title: '📧 EmailInputField詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.passwordInputDetail}
          component={PasswordInputDetailPage}
          options={{ title: '🔒 PasswordInputField詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.birthdayInputDetail}
          component={BirthdayInputDetailPage}
          options={{ title: '🗓️ BirthdayInputField詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.saveButtonDetail}
          component={SaveButtonDetailPage}
          options={{ title: '💾 SaveButton詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.iconSelectButtonDetail}
          component={IconSelectButtonDetailPage}
          options={{ title: '🎨 IconSelectButton詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.iconSelectPageDetail}
          component={IconSelectPageDetailPage}
          options={{ title: '🎨 IconSelectPage詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.DemoLoginPage} 
          component={DemoLoginPageScreen}
          options={{ title: '🔐 ログイン画面' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.DemoParentEditPage} 
          component={DemoParentEditPageScreen}
          options={{ title: '👤 親編集画面' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.ComponentShowcase} 
          component={ComponentShowcaseScreen}
          options={{ title: '🎨 コンポーネントショーケース' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.StoreInspector} 
          component={StoreInspectorScreen}
          options={{ title: '🔧 Store Inspector' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.SessionSettings} 
          component={SessionSettingsPage}
          options={{ title: '⚙️ セッション設定' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.PageStateSettings} 
          component={PageStateSettingsPage}
          options={{ title: '📝 ページ状態設定' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.LoginPageSettings} 
          component={LoginPageSettingsPage}
          options={{ title: '🔐 ログイン画面設定' }}
        />
        <DemoStack.Screen 
          name={DemoStackInfo.screens.ParentEditPageSettings} 
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
  return (
    <View style={{ flex: 1 }}>
      <ParentEditPage shouldUpdate={false} />
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
