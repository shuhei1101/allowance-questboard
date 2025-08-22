import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from './login-page/LoginPage';

export const AUTH_STACK {
  name: ’Auth’,
  screens 
}
export const AUTH_ = {
  login: 'Login',
} as const;

// 認証関連のナビゲーションパラメータ型定義
export type AuthStackParamList = {
  Login: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

/**
 * 認証関連のナビゲーター
 * ログイン画面を管理
 */
export function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName=SCREENS.Login
      screenOptions={{
        headerShown: false,
      }}
      {...({} as any)}
    >
      <AuthStack.Screen 
        name=SCREENS.Login 
        component={LoginPage} 
      />
    </AuthStack.Navigator>
  );
}
