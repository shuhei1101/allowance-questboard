import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { LoginPage } from './login-page/LoginPage';
import { UserRegisterPage } from './create-user-page/UserRegisterPage';
import { RoleSelectPage, RoleSelectPageProps } from './role-select-page/RoleSelectPage';

export const AuthStackMeta = {
  name: 'Auth',
  screens: {
    login: "Login",
    userRegister: "UserRegister",
    roleSelect: "RoleSelect",
    familyCreate: "FamilyCreate",
  },
} as const;

// 認証関連のナビゲーションパラメータ型定義
export type AuthStackParamList = {
  Login: undefined;
  UserRegister: undefined;
  RoleSelect: RoleSelectPageProps;
  FamilyCreate: undefined;
  EmailVerify: {
    email: string;
  };
};

const AuthStack = createStackNavigator<AuthStackParamList>();

/** 認証関連のナビゲーター
 *
 * ログイン画面と新規登録画面を管理 */
export function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName={AuthStackMeta.screens.login}
      screenOptions={{
        headerShown: false,
      }}
      {...({} as any)}
    >
      <AuthStack.Screen 
        name={AuthStackMeta.screens.login}
        component={LoginPage} 
      />
      <AuthStack.Screen 
        name={AuthStackMeta.screens.userRegister}
        component={UserRegisterPage}
        options={{
          headerShown: true,
          title: '新規登録',
        }}
      />
      <AuthStack.Screen 
        name={AuthStackMeta.screens.roleSelect}
        component={RoleSelectPage}
        options={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </AuthStack.Navigator>
  );
}
