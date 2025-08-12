import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar, Text } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// i18n初期化
import '@frontend/core/i18n';

// ページコンポーネント
import { LoginPage } from '@frontend/features/login/pages/LoginPage';

export default function App() {
  const [hasError, setHasError] = useState(false);

  // エラーバウンダリ代替
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('App Error:', error);
      setHasError(true);
    };

    // エラーリスナー追加（可能な場合）
    if (typeof addEventListener !== 'undefined') {
      addEventListener('error', errorHandler);
      return () => removeEventListener('error', errorHandler);
    }
  }, []);

  // エラー発生時のフォールバックUI
  if (hasError) {
    return (
      <SafeAreaView style={styles.container}>
        <ExpoStatusBar style="auto" />
        <View style={[styles.content, styles.errorContainer]}>
          <Text style={styles.errorTitle}>アプリでエラーが発生しました 😅</Text>
          <Text style={styles.errorMessage}>
            アプリを再起動してください。
            {'\n'}問題が続く場合は開発者にお知らせください。
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // 通常のUI
  try {
    return (
      <SafeAreaView style={styles.container}>
        <ExpoStatusBar style="auto" />
        <View style={styles.content}>
          <LoginPage />
        </View>
      </SafeAreaView>
    );
  } catch (error) {
    console.error('Render Error:', error);
    setHasError(true);
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
