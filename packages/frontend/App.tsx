import * as React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import '@/core/i18n';
import { ErrorBoundary } from './src/core/errors/ErrorBoundary';
import { analyzeError } from './src/core/errors/errorAnalysis';
import { useTheme } from '@/core/theme';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { AppInitializer } from './AppInitializer';
import { AppNavigator } from './AppNavigator';

/**
 * メインアプリコンポーネント
 * React Navigationを使用したナビゲーション設定
 */
export default function App() {
  /**
   * グローバルエラーハンドリング
   * ErrorBoundaryでキャッチされたエラーのログ出力と詳細解析
   */
  const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
    // エラー詳細情報の解析
    const analysisResult = analyzeError(error, errorInfo);

    // エラーログの出力
    console.error('🚨 Global Error Boundary caught error:', analysisResult);

    // TODO: エラーレポーティングサービスに送信
    // 例: Sentry, Crashlytics, など
  };

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <ThemeProvider>
        <AppInitializer>
          <AppContent />
        </AppInitializer>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

/**
 * ThemeProvider内で使用するアプリコンテンツ
 */
function AppContent() {
  const { colors, colorScheme } = useTheme(); // 自動テーマを使用

  return (
    <SafeAreaProvider style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ExpoStatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
