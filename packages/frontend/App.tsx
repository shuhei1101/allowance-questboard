import * as React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import '@/core/i18n';
import { ErrorBoundary } from './src/core/errors/ErrorBoundary';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { DemoNavigator } from '@/features/demo/DemoNavigator';
import { useTheme } from '@/core/theme';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { AppInitializer } from './AppInitializer';

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Demo: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

/**
 * メインアプリコンポーネント
 * React Navigationを使用したナビゲーション設定
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppInitializer>
        <AppContent />
      </AppInitializer>
    </ThemeProvider>
  );
}

/**
 * ThemeProvider内で使用するアプリコンテンツ
 */
function AppContent() {
  const { colors, colorScheme } = useTheme(); // 自動テーマを使用

  /**
   * グローバルエラーハンドリング
   * ErrorBoundaryでキャッチされたエラーのログ出力
   */
  const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
    // エラーログの出力
    console.error('🚨 Global Error Boundary caught error:', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo: {
        componentStack: errorInfo.componentStack,
      },
      timestamp: new Date().toISOString(),
    });

    // TODO: エラーレポーティングサービスに送信
    // 例: Sentry, Crashlytics, など
  };

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <SafeAreaProvider style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <ExpoStatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
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
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
});
