import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthInfo } from '../structure/session';
import { FamilyMemberTypeValue } from 'shared/features/family-member/value-object/familyMemberTypeValue';

/**
 * セッションストアのアクション定義
 */
interface SessionActions {
  /**
   * JWTトークンを更新する
   * ログイン成功時にJWTトークンを設定
   * @param jwt JWTトークン
   */
  updateJwt: (jwt: string) => void;

  /**
   * 家族メンバータイプを更新する
   * ログインタイプ選択後に家族メンバータイプを設定
   * @param familyMemberType 家族メンバータイプ
   */
  updateFamilyMemberType: (familyMemberType: FamilyMemberTypeValue) => void;

  /**
   * 認証情報をクリアする
   * ログアウト時に認証情報をクリアし、未認証状態にリセット
   */
  clearAuthInfo: () => void;

  /**
   * 認証状態をチェックする
   * JWTトークンの存在をチェックし、認証状態を返す
   * @returns 認証済みかどうか
   */
  isAuthenticated: () => boolean;

  /**
   * 家族メンバータイプを取得する
   * 現在ログイン中のユーザの家族メンバータイプを返す
   * @returns 家族メンバータイプ（未設定時はnull）
   */
  getFamilyMemberType: () => FamilyMemberTypeValue | null;
}

/**
 * セッションストアの型定義
 */
interface SessionState {
  /**
   * 認証情報
   * ログイン状態とユーザの役割を管理
   */
  authInfo: AuthInfo | null;
}

type SessionStore = SessionState & SessionActions;

/**
 * セッション状態管理ストア
 * Zustandを使用してセッション情報を管理
 */
export const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 初期状態
        authInfo: null,

        // アクションメソッド
        updateJwt: (jwt: string) => {
          set((state) => ({
            authInfo: {
              ...state.authInfo,
              jwt: jwt,
            }
          }), false, 'updateJwt');
        },

        updateFamilyMemberType: (familyMemberType: FamilyMemberTypeValue) => {
          set((state) => ({
            authInfo: {
              ...state.authInfo,
              familyMemberType: familyMemberType,
            }
          }), false, 'updateFamilyMemberType');
        },

        clearAuthInfo: () => {
          set({ authInfo: null }, false, 'clearAuthInfo');
        },

        isAuthenticated: () => {
          const { authInfo } = get();
          return authInfo !== null && (authInfo.jwt?.length ?? 0) > 0;
        },

        getFamilyMemberType: () => {
          const { authInfo } = get();
          return authInfo?.familyMemberType ?? null;
        },
      }),
      {
        name: 'session-storage', // localStorage のキー名
        partialize: (state) => ({
          authInfo: state.authInfo, // 永続化対象のステート
        }),
      }
    ),
    {
      name: 'session-store', // Redux DevTools での表示名
    }
  )
);
