import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EmailInputPage } from './components/EmailInputPage';
import { PasswordInputPage } from './components/PasswordInputPage';
import { BirthdayInputPage } from './components/BirthdayInputPage';
import { SaveButtonPage } from './components/SaveButtonPage';
import { IconSelectButtonPage } from './components/IconSelectButtonPage';
import { FamilyNameInputPage } from './components/FamilyNameInputPage';
import { FamilyNameInputEntryPage } from './components/FamilyNameInputEntryPage';
import { OnlineFamilyNameInputEntryPage } from './components/OnlineFamilyNameInputEntryPage';
import { FamilyIdInputPage } from './components/FamilyIdInputPage';
import { FamilyIdInputEntryPage } from './components/FamilyIdInputEntryPage';
import { IconSelectEntryPage } from './components/IconSelectEntryPage';
import { IconSelectInputEntryPage } from './components/IconSelectInputEntryPage';
import { ParentInfoInputPage } from './components/ParentInfoInputPage';
import { ParentInfoInputEntryPage } from './components/ParentInfoInputEntryPage';
import { FamilyRegisterPageDemo } from './components/FamilyRegisterPageDemo';
import { NavigationEntryLayoutPage } from './components/NavigationEntryLayoutPage';

export const DemoComponentStackMeta = {
  name: 'DemoComponent',
  screens: {
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
  },
} as const;

// 認証関連のナビゲーションパラメータ型定義
export type DemoComponentStackParamList = {
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
};

const DemoComponentStack = createStackNavigator<DemoComponentStackParamList>();

// /** LoginPageラッパー */
// const LoginPageWrapper: React.FC = () => {
//   const route = useRoute<RouteProp<DemoComponentStackParamList, typeof DemoComponentStackMeta.screens.login>>();
//   return <LoginPage {...route.params} />;
// };

/** 認証関連のナビゲーター
 *
 * ログイン画面と新規登録画面を管理 */
export function DemoComponentNavigator() {
  return (
    <DemoComponentStack.Navigator
      initialRouteName={undefined}
      {...({} as any)}
    >
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.emailInputPage}
        component={EmailInputPage}
        options={{ title: '📧 EmailInputField詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.passwordInputPage}
        component={PasswordInputPage}
        options={{ title: '🔒 PasswordInputField詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.birthdayInputPage}
        component={BirthdayInputPage}
        options={{ title: '🗓️ BirthdayInputField詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.saveButtonPage}
        component={SaveButtonPage}
        options={{ title: '💾 SaveButton詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.iconSelectButtonPage}
        component={IconSelectButtonPage}
        options={{ title: '🎨 IconSelectButton詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.familyNameInputPage}
        component={FamilyNameInputPage}
        options={{ title: '👤 FamilyNameInput詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.familyNameInputEntryPage}
        component={FamilyNameInputEntryPage}
        options={{ title: '🏠 FamilyNameInputEntry詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.onlineFamilyNameInputEntryPage}
        component={OnlineFamilyNameInputEntryPage}
        options={{ title: '🌐 OnlineFamilyNameInputEntry詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.familyIdInputPage}
        component={FamilyIdInputPage}
        options={{ title: '🆔 FamilyIdInput詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.familyIdInputEntryPage}
        component={FamilyIdInputEntryPage}
        options={{ title: '🆔 FamilyIdInputEntry詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.iconSelectEntryPage}
        component={IconSelectEntryPage}
        options={{ title: '🎨 IconSelectEntry詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.iconSelectInputEntryPage}
        component={IconSelectInputEntryPage}
        options={{ title: '🎨 IconSelectInputEntry詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.parentInfoInputPage}
        component={ParentInfoInputPage}
        options={{ title: '👤 ParentInfoInput詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.parentInfoInputEntryPage}
        component={ParentInfoInputEntryPage}
        options={{ title: '👤 ParentInfoInputEntry詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.familyRegisterPageDemo}
        component={FamilyRegisterPageDemo}
        options={{ title: '👪 FamilyRegisterPage詳細' }}
      />
      <DemoComponentStack.Screen 
        name={DemoComponentStackMeta.screens.navigationEntryLayoutPage}
        component={NavigationEntryLayoutPage}
        options={{ title: '📱 NavigationEntryLayout詳細' }}
      />
    </DemoComponentStack.Navigator>
  );
}
