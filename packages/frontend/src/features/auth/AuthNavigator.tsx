import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from './login-page/LoginPage';

export const StackInfo = {
  name: 'Auth',
  screens: {
    login: "Login",
  },
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
      initialRouteName={ StackInfo.screens.login }
      screenOptions={{
        headerShown: false,
      }}
      {...({} as any)}
    >
      <AuthStack.Screen 
        name={ StackInfo.screens.login }
        component={LoginPage} 
      />
    </AuthStack.Navigator>
  );
}
