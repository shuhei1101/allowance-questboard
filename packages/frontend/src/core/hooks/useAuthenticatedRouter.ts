import { useState, useEffect } from 'react';
import { JwtStorage } from '../../features/auth/services/jwtStorage';
import { createAuthenticatedClient } from '../api/trpcClient';
import { Session } from '../constants/sessionVariables';
import { AppRouter } from '../../../../backend/src/router';
import { TRPCClient } from '@trpc/client';

interface UseAuthenticatedRouterResult {
  /** tRPCクライアントルーター */
  router?: TRPCClient<AppRouter>;
  /** router初期化のローディング状態 */
  isInitializing: boolean;
}

/** 認証済みtRPCルーター初期化フック
 * 
 * JWTトークンを取得してtRPCクライアントを初期化する
 * ローディング状態を管理し、エラーはErrorBoundaryに委譲する */
export const useAuthenticatedRouter = (): UseAuthenticatedRouterResult => {
  const [router, setRouter] = useState<TRPCClient<AppRouter> | undefined>(undefined);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeRouter = async () => {
      try {
        setIsInitializing(true);
        
        const jwtToken = await JwtStorage.getToken();
        const authenticatedClient = createAuthenticatedClient({
          jwtToken,
          languageType: Session.languageType,
        });
        
        setRouter(authenticatedClient);
      } catch (error) {
        // ErrorBoundaryでキャッチされるようにthrowする
        const errorInstance = error instanceof Error ? error : new Error('Router initialization failed');
        throw errorInstance;
      } finally {
        setIsInitializing(false);
      }
    };

    initializeRouter();
  }, []);

  return {
    router,
    isInitializing,
  };
};
