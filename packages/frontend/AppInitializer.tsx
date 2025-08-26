import * as React from 'react';
import { useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { localeToLanguageType } from './src/features/auth/utils/localeToLanguageType';
import { LoadingPage } from './src/features/shared/loading-page/LoadingPage';
import { useSessionStore } from '@/features/auth/stores/sessionStore';
import { initMasterData } from '@/features/auth/services/initMasterData';
import { createAuthenticatedClient } from '@/core/api/trpcClient';
import { useAppConfigStore } from '@/features/shared/stores/appConfigStore';

/**
 * アプリ初期化コンポーネント
 * マスタデータの読み込みと言語設定を行い、完了後に子コンポーネントを表示
 */
export const AppInitializer: React.FC<{children: React.ReactNode}> = ({children}) => {
  const sessionStore = useSessionStore();
  const appConfigStore = useAppConfigStore();
  
  const [ready, setReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("アプリを初期化しています...");

  useEffect(() => {
    // アプリ初期化処理
    const init = async () => {
      try {
        // マスタデータ初期化
        setLoadingMessage("マスタデータを読み込んでいます... 🚀");
        console.log("マスタデータを読み込んでいます... 🚀");
        console.log('🚀 マスタデータ初期化開始...');
        await initMasterData({
          getMasterData: createAuthenticatedClient({
            jwtToken: sessionStore.jwt,
            languageType: sessionStore.languageType,
          }).init.getMasterData,
          setIconCategories: appConfigStore.setIconCategories,
          setAppIcons: appConfigStore.setAppIcons,
        });
        console.log('✅ マスタデータ初期化完了！');
        
        // 言語情報設定（マスタデータ取得前に実行）
        setLoadingMessage("言語設定を適用しています... 📱");
        const locale = Localization.getLocales()[0]?.languageCode || 'ja';
        const languageType = localeToLanguageType(locale);
        sessionStore.setLanguageType(languageType);
        
        // i18nの言語も同期
        await i18n.changeLanguage(locale);
        
        console.log('📱 初回言語設定:', locale);
        console.log('languageType.name:', languageType.name.value);
        console.log(' languageType.sortOrder:', languageType.sortOrder);

        // 初期化完了
        setLoadingMessage("初期化が完了しました! ✨");
        
        // 少し間を置いてから準備完了
        setTimeout(() => {
          setReady(true);
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
        
        // エラーが発生しても準備完了にする
        setTimeout(() => {
          setReady(true);
        }, 1000);
      }
    };

    init();
  }, []); // 依存配列を空にして1回だけ実行

  // 初期化中はローディング画面を表示
  if (!ready) {
    return <LoadingPage message={loadingMessage} />;
  }

  return <>{children}</>;
};
