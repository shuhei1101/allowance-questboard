import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from './login-page/LoginPage';
import { CreateUserPage } from './create-user-page/CreateUserPage';

export const AuthStackMeta = {
  name: 'Auth',
  screens: {
    login: "Login",
    createUser: "CreateUser",
  },
} as const;

// 認証関連のナビゲーションパラメータ型定義
export type AuthStackParamList = {
  Login: undefined;
  CreateUser: undefined;
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
        name={AuthStackMeta.screens.createUser}
        component={CreateUserPage}
        options={{
          headerShown: true,
          title: '新規登録',
        }}
      />
    </AuthStack.Navigator>
  );
}
