import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import type { AppRouter } from '@backend/router';

/**
 * 共通設定
 */
const TRPC_SERVER_URL = process.env.EXPO_PUBLIC_TRPC_SERVER_URL || 'http://localhost:3000/trpc';

const commonHeaders = () => ({
  'Content-Type': 'application/json',
  // 必要に応じて認証トークンやLanguageIDを設定
});

const httpLink = httpBatchLink({
  url: TRPC_SERVER_URL,
  headers: commonHeaders,
});

/**
 * React Query クライアント設定
 */
export const queryClient = new QueryClient();

/**
 * React用tRPCクライアント（useQueryとかで使う）
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * バニラtRPCクライアント（React外で使用）
 */
export const trpcClient = createTRPCClient<AppRouter>({
  links: [httpLink],
});
