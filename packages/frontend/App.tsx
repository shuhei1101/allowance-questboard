import * as React from 'react';
import { StyleSheet, Platform, StatusBar, AppState, AppStateStatus } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';
import '@/core/i18n';
import i18n from 'i18next';
import { localeToLanguageType } from './src/features/auth/utils/localeToLanguageType';
import { LoadingPage } from './src/shared/loading-page/LoadingPage';
import { ErrorBoundary } from './src/core/errors/ErrorBoundary';
import { useSessionStore } from '@/features/auth/stores/sessionStore';
import { initMasterData } from '@/features/auth/services/initMasterData';
import { LoginPage } from '@/features/auth/login-page/LoginPage';
import { DemoNavigator } from '@/features/demo/DemoNavigator';

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Demo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * メインアプリコンポーネント
 * React Navigationを使用したナビゲーション設定
 */
export default function App() {
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
      <SafeAreaProvider style={styles.container}>
        <ExpoStatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            id={undefined}
            initialRouteName="Demo"
            screenOptions={{
              headerShown: false,
              cardStyle: styles.content,
            }}
          >
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen 
              name="Login" 
              component={LoginPage}
              options={{
                headerShown: true,
                title: 'ログイン',
              }}
            />
            <Stack.Screen 
              name="Demo" 
              component={DemoNavigator}
              options={{
                headerShown: false,
                title: 'デモ',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

/**
 * ホーム画面コンポーネント
 * アプリのエントリーポイント
 */
function HomePage() {
  const sessionStore = useSessionStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("アプリを初期化しています...");

  useEffect(() => {
    // アプリ初期化処理
    const initializeApp = async () => {
      try {
        // 1. マスタデータ初期化
        setLoadingMessage("マスタデータを読み込んでいます... 🚀");
        console.log('🚀 マスタデータ初期化開始...');
        await initMasterData();
        console.log('✅ マスタデータ初期化完了！');

        // 2. 言語情報設定
        setLoadingMessage("言語設定を適用しています... 📱");
        const locale = Localization.getLocales()[0]?.languageCode || 'ja';
        const languageType = localeToLanguageType(locale);
        sessionStore.setLanguageType(languageType);
        
        // i18nの言語も同期
        await i18n.changeLanguage(locale);
        
        console.log('📱 初回言語設定:', locale);
        console.log('languageType.name:', languageType.name.value);
        console.log(' languageType.sortOrder:', languageType.sortOrder);

        // 3. 初期化完了
        setLoadingMessage("初期化が完了しました! ✨");
        
        // 少し間を置いてからロード画面を非表示にする
        setTimeout(() => {
          setIsInitializing(false);
        }, 500);

      } catch (error) {
        console.error('❌ アプリ初期化エラー:', error);
        
        // 初期化エラーの場合は上位のErrorBoundaryに委譲
        // 致命的なエラー（マスタデータ読み込み失敗など）の場合はthrowして
        // ErrorBoundaryでキャッチさせる
        if (error instanceof Error && error.message.includes('critical')) {
          throw error;
        }
        
        // 非致命的なエラーの場合はフォールバック処理を実行
        setLoadingMessage("エラーが発生しましたが、続行します... ⚠️");
        const locale = Localization.getLocales()[0]?.languageCode || 'ja';
        const languageType = localeToLanguageType(locale);
        sessionStore.setLanguageType(languageType);
        
        // i18nの言語も同期（フォールバック）
        try {
          await i18n.changeLanguage(locale);
        } catch (i18nError) {
          console.warn('i18n言語設定エラー:', i18nError);
        }
        
        console.log('📱 フォールバック言語設定:', locale);
        
        // エラーが発生してもロード画面を非表示にする
        setTimeout(() => {
          setIsInitializing(false);
        }, 1000);
      }
    };

    initializeApp();

  }, []); // 依存配列を空にして1回だけ実行

  // 初期化中はローディング画面を表示
  if (isInitializing) {
    return <LoadingPage message={loadingMessage} />;
  }

  return <LoginPage />;
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
