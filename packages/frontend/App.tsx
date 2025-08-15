import * as React from 'react';
import { StyleSheet, Platform, StatusBar, AppState, AppStateStatus } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';

// i18n初期化
import '@/core/i18n';

// Session store
import { useSessionStore } from './src/features/auth/shared/store/sessionStore';
import { localeToLanguageType } from './src/features/auth/shared/utils/localeToLanguageType';

// Usecase
import { initMasterData } from './src/features/auth/shared/usecase/initMasterData';

// Components
import { LoadingScreen } from './src/shared/components/LoadingScreen';

// Pages
import { LoginPage } from './src/features/auth/login-page';

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * メインアプリコンポーネント
 * React Navigationを使用したナビゲーション設定
 */
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ExpoStatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          id={undefined}
          initialRouteName="Home"
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
              title: 'ログイン',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
        // エラーが発生しても言語設定は実行する
        setLoadingMessage("エラーが発生しましたが、続行します... ⚠️");
        const locale = Localization.getLocales()[0]?.languageCode || 'ja';
        const languageType = localeToLanguageType(locale);
        sessionStore.setLanguageType(languageType);
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
    return <LoadingScreen message={loadingMessage} />;
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
