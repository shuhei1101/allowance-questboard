import * as React from 'react';
import { NavigationContainer, NavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator, AuthStackMeta as AuthStackMeta, AuthStackParamList } from '@/features/auth/AuthNavigator';
import { ParentNavigator, ParentStackMeta, ParentStackParamList } from '@/features/parent/ParentNavigator';
import { CommonNavigator, CommonStackMeta, CommonStackParamList } from '@/features/shared/CommonNavigator';
import { DemoNavigator, DemoStackMeta, DemoStackParamList } from '@demo/DemoNavigator';
import { useTheme } from '@/core/theme';
import { FamilyNavigator, FamilyStackMeta, FamilyStackParamList } from './src/features/family/FamilyNavigator';

export const useAppNavigation = () => useNavigation<NavigationProp<AppStackParamList>>();

// Navigation types - 機能別Navigatorを組み合わせる
export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Parent: NavigatorScreenParams<ParentStackParamList>;
  Common: NavigatorScreenParams<CommonStackParamList>;
  Demo: NavigatorScreenParams<DemoStackParamList>;
  Family: NavigatorScreenParams<FamilyStackParamList>;
};

const AppStack = createStackNavigator<AppStackParamList>();

/**
 * アプリケーションのナビゲーション設定
 * 機能別のNavigatorを組み合わせたルーティング管理
 */
export function AppNavigator() {
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
          name={AuthStackMeta.name}
          component={AuthNavigator} 
        />
        <AppStack.Screen 
          name={ParentStackMeta.name}
          component={ParentNavigator} 
        />
        <AppStack.Screen 
          name={FamilyStackMeta.name}
          component={FamilyNavigator} 
        />
        <AppStack.Screen 
          name={CommonStackMeta.name} 
          component={CommonNavigator} 
        />
        <AppStack.Screen 
          name={DemoStackMeta.name} 
          component={DemoNavigator}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
