import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

// i18n初期化
import '@frontend/core/i18n';

/**
 * ルートレイアウト
 * アプリ全体の基本構造とナビゲーションスタックを定義
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ExpoStatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false, // ヘッダーを非表示（必要に応じて各画面で設定）
          contentStyle: styles.content,
        }}
      >
        {/* ルートスクリーンは index.tsx */}
        <Stack.Screen name="index" />
        
        {/* 他のスクリーンも定義可能 */}
        <Stack.Screen 
          name="login"
          options={{
            title: 'ログイン',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
