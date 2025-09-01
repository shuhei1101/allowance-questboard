import React from 'react';
import { useAuthenticatedRouter } from '../hooks/useAuthenticatedRouter';
import { LoadingPage } from '../../features/shared/loading-page/LoadingPage';
import { AppRouter } from '../../../../backend/src/router';
import { TRPCClient } from '@trpc/client';

interface WithAuthenticatedRouterProps {
  /** router初期化完了後に表示するコンポーネント */
  children: (router: TRPCClient<AppRouter>) => React.ReactNode;
  /** ローディング中に表示するメッセージ */
  loadingMessage?: string;
}

/** 認証済みルーター初期化ラッパー
 * 
 * router初期化中はLoadingPageを表示し、
 * 初期化完了後にchildrenを描画する高階コンポーネント */
export const WithAuthenticatedRouter: React.FC<WithAuthenticatedRouterProps> = ({
  children,
  loadingMessage = "アプリを初期化しています..."
}) => {
  const { router, isInitializing } = useAuthenticatedRouter();

  // router初期化中はローディング表示
  if (isInitializing || router === undefined) {
    return <LoadingPage message={loadingMessage} />;
  }

  // 初期化完了後にchildrenを描画
  return <>{children(router)}</>;
};
