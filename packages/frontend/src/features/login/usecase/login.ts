import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@backend/router';
import { trpcClient } from '@frontend/core/api/trpcClient';
import { useSessionStore } from '@frontend/features/session/store/sessionStore';
import { useLoginPageStore } from '../store/loginPageStore';

/**
 * ログインユースケースのパラメータ
 */
export interface LoginParams {
  /** JWTトークン */
  jwtToken: string;
}

/**
 * ログインユースケースの実行結果
 */
export interface LoginResult {
  /** 成功フラグ */
  success: boolean;
  /** エラーメッセージ（失敗時のみ） */
  errorMessage?: string;
}

/**
 * ログインユースケース
 * 
 * JWTトークンを使用してログインAPIを呼び出し、
 * 認証情報をセッションストアに保存する
 * 
 * @param params ログインパラメータ
 * @returns ログイン結果
 */
export const login = async (params: LoginParams): Promise<LoginResult> => {
  const { jwtToken } = params;
  
  // ローディング状態を開始
  const { setLoading } = useLoginPageStore.getState();
  const { updateJwt } = useSessionStore.getState();
  
  setLoading(true);
  
  try {
    // tRPCクライアントでログインAPI呼び出し
    // 動的にヘッダーを設定してクライアントを作成
    const clientWithAuth = createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: process.env.EXPO_PUBLIC_TRPC_SERVER_URL || 'http://localhost:3000/trpc',
          headers: () => ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
            'languageid': '1', // デフォルトで日本語
          }),
        }),
      ],
    });

    const response = await (clientWithAuth as any).login.login.query();
    
    // JWTトークンをセッションに保存
    // ※ familyMemberTypeは後でログインタイプ選択時に設定される
    updateJwt(jwtToken);
    
    return {
      success: true,
    };
    
  } catch (error) {
    console.error('ログインエラー:', error);
    
    let errorMessage = 'ログインに失敗しました';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      errorMessage,
    };
    
  } finally {
    // ローディング状態を終了
    setLoading(false);
  }
};
