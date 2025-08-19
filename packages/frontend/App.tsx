import * as React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import '@/core/i18n';
import { ErrorBoundary } from './src/core/errors/ErrorBoundary';
import { useTheme } from '@/core/theme';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { AppInitializer } from './AppInitializer';
import { AppNavigator, RootStackParamList } from './AppNavigator';

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
        <AppNavigator onError={handleGlobalError} />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
