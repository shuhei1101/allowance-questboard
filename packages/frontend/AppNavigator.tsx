import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator, NAME as AUTH_STACK_NAME } from '@/features/auth/AuthNavigator';
import { ParentNavigator } from '@/features/parent/ParentNavigator';
import { CommonNavigator } from '@/features/shared/CommonNavigator';
import { DemoNavigator } from '@demo/DemoNavigator';
import { useTheme } from '@/core/theme';


// Navigation types - 機能別Navigatorを組み合わせる
export type AppStackParamList = {
  // Navigator 系
  Auth: undefined;
  Parent: undefined;
  Common: undefined;
  Demo: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

export interface AppNavigatorProps {
  /**
   * グローバルエラーハンドリング関数
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * アプリケーションのナビゲーション設定
 * 機能別のNavigatorを組み合わせたルーティング管理
 */
export function AppNavigator(props: AppNavigatorProps) {
  const { colors, colorScheme } = useTheme();

  return (
    <NavigationContainer theme={{
      dark: colorScheme === 'dark',
      colors: {
        primary: colors.primary,
        background: colors.background.primary,
        card: colors.surface.elevated,
        text: colors.text.primary,
        border: colors.border.light,
        notification: colors.primary,
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
    }}>
      <AppStack.Navigator
        initialRouteName="Demo"
        screenOptions={{
          headerShown: false,
        }}
        {...({} as any)}
      >
        <AppStack.Screen 
          name=AUTH_STACK_NAME
          component={AuthNavigator} 
        />
        <AppStack.Screen 
          name="Parent" 
          component={ParentNavigator} 
        />
        <AppStack.Screen 
          name="Common" 
          component={CommonNavigator} 
        />
        <AppStack.Screen 
          name="Demo" 
          component={DemoNavigator} 
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
