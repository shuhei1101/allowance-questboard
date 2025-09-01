import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink, TRPCClient } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import { AppRouter } from '@backend/router';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';
import { AppError } from '../../../../backend/src/core/errors/appError';
import { LocaleString } from '../../../../backend/src/core/messages/localeString';

/** 共通設定 */
const TRPC_SERVER_URL = process.env.EXPO_PUBLIC_TRPC_SERVER_URL || 'http://localhost:3000/trpc';

const commonHeaders = () => ({
  'Content-Type': 'application/json',
  // 必要に応じて認証トークンやLanguageIDを設定
});

const httpLink = httpBatchLink({
  url: TRPC_SERVER_URL,
  headers: commonHeaders,
});

/** React Query クライアント設定 */
export const queryClient = new QueryClient();

/** React用tRPCクライアント（useQueryとかで使う） */
export const trpc = createTRPCReact<AppRouter>();

/** バニラtRPCクライアント（React外で使用） */
export const trpcClient = createTRPCClient<AppRouter>({
  links: [httpLink],
});

export type CreateAuthenticatedClient = (params: { jwtToken?: string, languageType: LanguageTypeValue }) => TRPCClient<AppRouter>;

/** 認証トークン付きのtRPCクライアントを作成 */
export const createAuthenticatedClient: CreateAuthenticatedClient = (params: { jwtToken?: string, languageType: LanguageTypeValue }) => {
  if (!params.jwtToken) {
    throw new AppError({
      errorType: "UNAUTHORIZED",
      message: new LocaleString({
        ja: "認証トークンが提供されていません。",
        en: "Authentication token is missing.",
      })
    });
  }

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${params.jwtToken}`,
    'languageid': params.languageType.id.toString(), // LanguageTypeValueからIDを取得
  });

  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: TRPC_SERVER_URL,
        headers,
      }),
    ],
  });
};
