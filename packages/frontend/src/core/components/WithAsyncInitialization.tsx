import React from 'react';
import { LoadingPage } from '../../features/shared/loading-page/LoadingPage';

interface AsyncInitializationResult<T> {
  /** 初期化結果データ */
  data?: T;
  /** 初期化中かどうか */
  isInitializing: boolean;
  /** 初期化エラー（ErrorBoundaryに委譲するためthrowすることを推奨） */
  error?: Error;
}

interface WithAsyncInitializationProps<T> {
  /** 非同期初期化フック */
  useInitialization: () => AsyncInitializationResult<T>;
  /** 初期化完了後に表示するコンポーネント */
  children: (data: T) => React.ReactNode;
  /** ローディング中に表示するメッセージ */
  loadingMessage?: string;
}

/** 汎用非同期初期化ラッパー
 * 
 * 任意の非同期初期化処理をラップし、初期化中はLoadingPageを表示、
 * 初期化完了後にchildrenを描画する汎用高階コンポーネント */
export const WithAsyncInitialization = <T,>({
  useInitialization,
  children,
  loadingMessage = "データを読み込んでいます..."
}: WithAsyncInitializationProps<T>): React.ReactElement => {
  const { data, isInitializing, error } = useInitialization();

  // エラーがある場合はthrow（ErrorBoundaryでキャッチされる）
  if (error) {
    throw error;
  }

  // 初期化中またはデータがない場合はローディング表示
  if (isInitializing || data === undefined) {
    return <LoadingPage message={loadingMessage} />;
  }

  // 初期化完了後にchildrenを描画
  return <>{children(data)}</>;
};
