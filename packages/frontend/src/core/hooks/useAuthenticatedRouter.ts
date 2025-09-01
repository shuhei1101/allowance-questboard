import { useState, useEffect } from 'react';
import { JwtStorage } from '../../features/auth/services/jwtStorage';
import { createAuthenticatedClient } from '../api/trpcClient';
import { Session } from '../constants/sessionVariables';
import { AppRouter } from '../../../../backend/src/router';
import { TRPCClient } from '@trpc/client';

interface UseAuthenticatedRouterResult {
  /** tRPCクライアントルーター */
  data?: TRPCClient<AppRouter>;
  /** router初期化のローディング状態 */
  isInitializing: boolean;
  /** 初期化エラー */
  error?: Error;
}

/** 認証済みtRPCルーター初期化フック
 * 
 * JWTトークンを取得してtRPCクライアントを初期化する
 * ローディング状態を管理し、エラーはErrorBoundaryに委譲する */
export const useAuthenticatedRouter = (): UseAuthenticatedRouterResult => {
  const [router, setRouter] = useState<TRPCClient<AppRouter> | undefined>(undefined);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const initializeRouter = async () => {
      try {
        setIsInitializing(true);
        setError(undefined);
        
        const jwtToken = await JwtStorage.getToken();
        const authenticatedClient = createAuthenticatedClient({
          jwtToken,
          languageType: Session.languageType,
        });
        
        setRouter(authenticatedClient);
      } catch (err) {
        const errorInstance = err instanceof Error ? err : new Error('Router initialization failed');
        setError(errorInstance);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeRouter();
  }, []);

  return {
    data: router,
    isInitializing,
    error,
  };
};
