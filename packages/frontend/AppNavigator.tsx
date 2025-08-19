import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { DemoNavigator } from '@demo/DemoNavigator';
import { useTheme } from '@/core/theme';

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Demo: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export interface AppNavigatorProps {
  /**
   * グローバルエラーハンドリング関数
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * アプリケーションのナビゲーション設定
 * React Navigationを使用したルーティング管理
 */
export function AppNavigator(props: AppNavigatorProps) {
  const { colors, colorScheme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: colorScheme === 'dark',
        colors: {
          primary: colors.primary,
          background: colors.background.primary,
          card: colors.surface.elevated,
          text: colors.text.primary,
          border: colors.border.light,
          notification: colors.danger,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: 'bold',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <RootStack.Navigator
        id={undefined}
        initialRouteName="Demo"
        screenOptions={{
          headerShown: false,
          cardStyle: [styles.content, { backgroundColor: colors.background.primary }],
        }}
      >
        <RootStack.Screen 
          name="Login" 
          component={LoginPage}
          options={{
            headerShown: true,
            title: 'ログイン',
          }}
        />
        <RootStack.Screen 
          name="Demo" 
          component={DemoNavigator}
          options={{
            headerShown: false,
            title: 'デモ',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
