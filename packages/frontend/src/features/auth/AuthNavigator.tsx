import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { LoginPage } from './login-page/LoginPage';
import { UserRegisterPage } from './create-user-page/UserRegisterPage';

export const AuthStackMeta = {
  name: 'Auth',
  screens: {
    login: "Login",
    userRegister: "UserRegister",
    emailVerify: "EmailVerify",
  },
} as const;

// 認証関連のナビゲーションパラメータ型定義
export type AuthStackParamList = {
  Login: undefined;
  UserRegister: undefined;
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
    </AuthStack.Navigator>
  );
}
