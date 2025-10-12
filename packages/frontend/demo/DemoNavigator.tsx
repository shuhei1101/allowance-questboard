import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Alert } from 'react-native';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { ParentEditPage } from '@/features/parent/parent-edit-page/ParentEditPage';
import { FamilyRegisterPage } from '@/features/family/family-register-page/FamilyRegisterPage';
import { FamilyRegisterForm } from '@/features/family/family-register-page/models/familyRegisterForm';
import { Parent } from '@backend/features/parent/models/parent';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { FamilyId } from '@backend/features/family/value-object/familyId';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';
import { FamilyName } from '@backend/features/family/value-object/familyName';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';
import { ConfirmButton } from '@/features/shared/components/ConfirmButton';
import { DemoMockProvider } from './providers/DemoMockProvider';
import { ComponentShowcase } from './development/component-showcase-page/ComponentShowcase';
import { StoreInspector } from './development/store-inspector-page/StoreInspector';
import { DevelopmentTopPage } from './development/development-top-page/DevelopmentTopPage';
import { ScreenListPage } from './development/screen-list-page/ScreenListPage';
import { ComponentListPage } from './development/component/ComponentListPage';
import { ScreenLauncherPage } from './development/screen-launcher-page/ScreenLauncherPage';
import { DependencyComponentListPage } from './development/dependency-component-list-page/DependencyComponentListPage';
// 新しいコンポーネント詳細ページ
import { EmailInputPage } from './development/component/components/EmailInputPage';
import { PasswordInputPage } from './development/component/components/PasswordInputPage';
import { BirthdayInputPage } from './development/component/components/BirthdayInputPage';
import { SaveButtonPage } from './development/component/components/SaveButtonPage';
import { IconSelectButtonPage } from './development/component/components/IconSelectButtonPage';
import { FamilyNameInputPage } from './development/component/components/FamilyNameInputPage';
import { FamilyNameInputEntryPage } from './development/component/components/FamilyNameInputEntryPage';
import { OnlineFamilyNameInputEntryPage } from './development/component/components/OnlineFamilyNameInputEntryPage';
import { FamilyIdInputPage } from './development/component/components/FamilyIdInputPage';
import { FamilyIdInputEntryPage } from './development/component/components/FamilyIdInputEntryPage';
import { IconSelectEntryPage } from './development/component/components/IconSelectEntryPage';
import { IconSelectInputEntryPage } from './development/component/components/IconSelectInputEntryPage';
import { ParentInfoInputPage } from './development/component/components/ParentInfoInputPage';
import { ParentInfoInputEntryPage } from './development/component/components/ParentInfoInputEntryPage';
import { FamilyRegisterPageDemo } from './development/component/components/FamilyRegisterPageDemo';
import { NavigationEntryLayoutPage } from './development/component/components/NavigationEntryLayoutPage';
import { SessionSettingsPage } from './test-environment/SessionSettingsPage';
import { PageStateSettingsPage } from './test-environment/PageStateSettingsPage';
import { LoginPageSettingsPage } from './test-environment/LoginPageSettingsPage';
import { ParentEditPageSettingsPage } from './test-environment/ParentEditPageSettingsPage';

export const DemoStackMeta = {
  name: 'Demo',
  screens: {
    developmentTop: "DevelopmentTop",
    screenList: "ScreenList",
    componentList: "ComponentList",
    screenLauncher: "ScreenLauncher",
    dependencyComponentList: "DependencyComponentList",
    emailInputPage: "EmailInputPage",
    passwordInputPage: "PasswordInputPage",
    birthdayInputPage: "BirthdayInputPage",
    saveButtonPage: "SaveButtonPage",
    iconSelectButtonPage: "IconSelectButtonPage",
    familyNameInputPage: "FamilyNameInputPage",
    familyNameInputEntryPage: "FamilyNameInputEntryPage",
    onlineFamilyNameInputEntryPage: "OnlineFamilyNameInputEntryPage",
    familyIdInputPage: "FamilyIdInputPage",
    familyIdInputEntryPage: "FamilyIdInputEntryPage",
    iconSelectEntryPage: "IconSelectEntryPage",
    iconSelectInputEntryPage: "IconSelectInputEntryPage",
    parentInfoInputPage: "ParentInfoInputPage",
    parentInfoInputEntryPage: "ParentInfoInputEntryPage",
    familyRegisterPageDemo: "FamilyRegisterPageDemo",
    DemoFamilyRegisterPage: "DemoFamilyRegisterPage",
    navigationEntryLayoutPage: "NavigationEntryLayoutPage",
    DemoLoginPage: "DemoLoginPage",
    DemoParentEditPage: "DemoParentEditPage",
    ComponentShowcase: "ComponentShowcase",
    StoreInspector: "StoreInspector",
    SessionSettings: "SessionSettings",
    PageStateSettings: "PageStateSettings",
    LoginPageSettings: "LoginPageSettings",
    ParentEditPageSettings: "ParentEditPageSettings",
    Main: "Main",
  },
} as const;

// Demo Navigation Types
export type DemoStackParamList = {
  DevelopmentTop: undefined;
  ScreenList: undefined;
  ComponentList: undefined;
  ScreenLauncher: { screenType: string };
  DependencyComponentList: { 
    components: Array<{
      id: string;
      name: string;
      icon: string;
      description: string;
    }>;
    screenTitle: string;
  };
  // 新しいコンポーネント詳細ページ
  EmailInputPage: undefined;
  PasswordInputPage: undefined;
  BirthdayInputPage: undefined;
  SaveButtonPage: undefined;
  IconSelectButtonPage: undefined;
  FamilyNameInputPage: undefined;
  FamilyNameInputEntryPage: undefined;
  OnlineFamilyNameInputEntryPage: undefined;
  FamilyIdInputPage: undefined;
  FamilyIdInputEntryPage: undefined;
  IconSelectEntryPage: undefined;
  IconSelectInputEntryPage: undefined;
  ParentInfoInputPage: undefined;
  ParentInfoInputEntryPage: undefined;
  FamilyRegisterPageDemo: undefined;
  DemoFamilyRegisterPage: undefined;
  NavigationEntryLayoutPage: undefined;
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
        initialRouteName={DemoStackMeta.screens.developmentTop}
      >
        <DemoStack.Screen 
          name={DemoStackMeta.screens.developmentTop}
          component={DevelopmentTopPage}
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
          name={DemoStackMeta.screens.screenLauncher}
          component={ScreenLauncherPage}
          options={{ title: '🚀 画面起動' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.dependencyComponentList}
          component={DependencyComponentListPage}
          options={{ title: '🧩 依存コンポーネント一覧' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.emailInputPage}
          component={EmailInputPage}
          options={{ title: '📧 EmailInputField詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.passwordInputPage}
          component={PasswordInputPage}
          options={{ title: '🔒 PasswordInputField詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.birthdayInputPage}
          component={BirthdayInputPage}
          options={{ title: '🗓️ BirthdayInputField詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.saveButtonPage}
          component={SaveButtonPage}
          options={{ title: '💾 SaveButton詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.iconSelectButtonPage}
          component={IconSelectButtonPage}
          options={{ title: '🎨 IconSelectButton詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.familyNameInputPage}
          component={FamilyNameInputPage}
          options={{ title: '👤 FamilyNameInput詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.familyNameInputEntryPage}
          component={FamilyNameInputEntryPage}
          options={{ title: '🏠 FamilyNameInputEntry詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.onlineFamilyNameInputEntryPage}
          component={OnlineFamilyNameInputEntryPage}
          options={{ title: '🌐 OnlineFamilyNameInputEntry詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.familyIdInputPage}
          component={FamilyIdInputPage}
          options={{ title: '🆔 FamilyIdInput詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.familyIdInputEntryPage}
          component={FamilyIdInputEntryPage}
          options={{ title: '🆔 FamilyIdInputEntry詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.iconSelectEntryPage}
          component={IconSelectEntryPage}
          options={{ title: '🎨 IconSelectEntry詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.iconSelectInputEntryPage}
          component={IconSelectInputEntryPage}
          options={{ title: '🎨 IconSelectInputEntry詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.parentInfoInputPage}
          component={ParentInfoInputPage}
          options={{ title: '👤 ParentInfoInput詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.parentInfoInputEntryPage}
          component={ParentInfoInputEntryPage}
          options={{ title: '👤 ParentInfoInputEntry詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.familyRegisterPageDemo}
          component={FamilyRegisterPageDemo}
          options={{ title: '👪 FamilyRegisterPage詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.navigationEntryLayoutPage}
          component={NavigationEntryLayoutPage}
          options={{ title: '📱 NavigationEntryLayout詳細' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.DemoLoginPage} 
          component={DemoLoginPageScreen}
          options={{ title: '🔐 ログイン画面' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.DemoFamilyRegisterPage} 
          component={DemoFamilyRegisterPageScreen}
          options={{ 
            title: '👪 家族登録画面',
            headerRight: () => (
              <ConfirmButton
                onPress={() => Alert.alert('登録完了', 'デモ用確定ボタンが押されました')}
                variant="header"
                size="small"
              />
            ),
          }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.DemoParentEditPage} 
          component={DemoParentEditPageScreen}
          options={{ title: '👤 親編集画面' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.ComponentShowcase} 
          component={ComponentShowcaseScreen}
          options={{ title: '🎨 コンポーネントショーケース' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.StoreInspector} 
          component={StoreInspectorScreen}
          options={{ title: '🔧 Store Inspector' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.SessionSettings} 
          component={SessionSettingsPage}
          options={{ title: '⚙️ セッション設定' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.PageStateSettings} 
          component={PageStateSettingsPage}
          options={{ title: '📝 ページ状態設定' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.LoginPageSettings} 
          component={LoginPageSettingsPage}
          options={{ title: '🔐 ログイン画面設定' }}
        />
        <DemoStack.Screen 
          name={DemoStackMeta.screens.ParentEditPageSettings} 
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
 * 家族登録画面のデモ
 */
const DemoFamilyRegisterPageScreen: React.FC = () => {
  // サンプルフォームの作成
  const [form, setForm] = useState(() => {
    try {
      return new FamilyRegisterForm({
        family: {
          displayId: new FamilyDisplayId('tanaka_family'),
          name: new FamilyName('田中'),
          onlineName: new FamilyOnlineName('田中'),
        },
        parent: {
          name: new ParentName('田中太郎'),
          birthday: new Birthday(new Date('1985-05-15')),
        },
      });
    } catch (error) {
      console.error('Failed to create FamilyRegisterForm:', error);
      // フォールバック用の簡単なオブジェクト
      return {
        family: {
          displayId: { value: 'tanaka_family' },
          name: { value: '田中' },
          onlineName: { value: '田中' },
        },
        parent: {
          name: { value: '田中太郎' },
          birthday: { value: new Date('1985-05-15') },
        },
      } as any;
    }
  });

  // サンプル親情報の作成
  const [parent, setParent] = useState<Parent | undefined>(() => {
    try {
      return new Parent({
        id: new ParentId(123),
        familyId: new FamilyId(456),
        name: new ParentName('田中太郎'),
        iconId: new IconId(1),
        birthday: new Birthday(new Date('1985-05-15')),
      });
    } catch (error) {
      console.error('Failed to create Parent:', error);
      return undefined;
    }
  });

  // ハンドラー関数群
  const handleFamilyNameChange = (value: BaseFamilyName) => {
    console.log('家族名変更:', value.value);
    setForm((prevForm: any) => ({
      ...prevForm,
      family: {
        ...prevForm.family,
        name: value,
      },
    }));
  };

  const handleOnlineFamilyNameChange = (value: FamilyOnlineName) => {
    console.log('オンライン家族名変更:', value.value);
    setForm((prevForm: any) => ({
      ...prevForm,
      family: {
        ...prevForm.family,
        onlineName: value,
      },
    }));
  };

  const handleFamilyIdChange = (value: FamilyDisplayId) => {
    console.log('家族ID変更:', value.value);
    setForm((prevForm: any) => ({
      ...prevForm,
      family: {
        ...prevForm.family,
        displayId: value,
      },
    }));
  };

  const handleIconSelect = () => {
    Alert.alert('アイコン選択', 'アイコン選択画面（未実装）');
  };

  const handleParentEdit = () => {
    Alert.alert('親情報編集', '親編集画面（未実装）');
  };

  const handleSubmit = (familyId?: string, parentId?: string) => {
    Alert.alert('登録完了', `家族ID: ${familyId}, 親ID: ${parentId}`);
  };

  return (
    <View style={{ flex: 1 }}>
            <FamilyRegisterPage
        form={form}
        parent={undefined}
        onFamilyNameChange={handleFamilyNameChange}
        onOnlineFamilyNameChange={handleOnlineFamilyNameChange}
        onFamilyIdChange={handleFamilyIdChange}
        onIconSelect={handleIconSelect}
        onParentEdit={handleParentEdit}
        onSubmit={handleSubmit}
        isValid={form.isValid}
        isLoading={false}
        disabled={false}
      />
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
