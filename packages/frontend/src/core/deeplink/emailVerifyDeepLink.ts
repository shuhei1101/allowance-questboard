import { Linking } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import { AuthStackMeta } from '../../features/auth/AuthNavigator';

/** Deep Linkパラメータの型定義 */
export interface EmailVerifyDeepLinkParams {
  /** 認証トークン */
  token?: string;
  /** 認証タイプ */
  type?: string;
  /** リダイレクト先URL */
  redirect_to?: string;
  /** エラー情報 */
  error?: string;
  /** メールアドレス */
  email?: string;
}

/** Deep Link URL解析結果の型定義 */
export interface DeepLinkParseResult {
  /** 解析成功フラグ */
  isValid: boolean;
  /** 解析されたパラメータ */
  params: EmailVerifyDeepLinkParams;
  /** エラーメッセージ */
  error?: string;
}

/** メール認証Deep Link処理クラス */
export class EmailVerifyDeepLink {
  private navigationRef: NavigationContainerRef<any> | null = null;

  /** ナビゲーション参照を設定
   *
   * Deep Link処理で画面遷移を行うためのナビゲーション参照を設定 */
  setNavigationRef(ref: NavigationContainerRef<any>): void {
    this.navigationRef = ref;
  }

  /** Deep Link URLを解析してパラメータを抽出
   *
   * メール認証リンクのURLからパラメータを解析し、構造化されたデータとして返す */
  parseDeepLinkUrl(url: string): DeepLinkParseResult {
    try {
      const urlObj = new URL(url);
      const searchParams = urlObj.searchParams;

      // メール認証関連のパラメータを抽出
      const params: EmailVerifyDeepLinkParams = {
        token: searchParams.get('token') || undefined,
        type: searchParams.get('type') || undefined,
        redirect_to: searchParams.get('redirect_to') || undefined,
        error: searchParams.get('error') || undefined,
        email: searchParams.get('email') || undefined,
      };

      // メール認証タイプの確認
      if (params.type !== 'email') {
        return {
          isValid: false,
          params,
          error: 'Invalid verification type',
        };
      }

      // 必要なパラメータの確認
      if (!params.token && !params.error) {
        return {
          isValid: false,
          params,
          error: 'Missing required parameters',
        };
      }

      return {
        isValid: true,
        params,
      };
    } catch (error) {
      return {
        isValid: false,
        params: {},
        error: error instanceof Error ? error.message : 'URL parsing failed',
      };
    }
  }

  /** Deep Link処理を実行
   *
   * 解析されたパラメータに基づいてメール認証画面への遷移や認証処理を実行 */
  async handleDeepLink(params: EmailVerifyDeepLinkParams): Promise<void> {
    if (!this.navigationRef) {
      console.error('Navigation reference not set');
      return;
    }

    try {
      // エラーがある場合の処理
      if (params.error) {
        console.error('Deep link error:', params.error);
        // エラー情報を含めてメール認証画面に遷移
        if (params.email) {
          this.navigationRef.navigate('Auth', {
            screen: AuthStackMeta.screens.emailVerify,
            params: { email: params.email },
          });
        }
        return;
      }

      // 正常な認証トークンがある場合
      if (params.token) {
        // メール認証画面に遷移
        // 認証チェックは画面側で自動実行される
        if (params.email) {
          this.navigationRef.navigate('Auth', {
            screen: AuthStackMeta.screens.emailVerify,
            params: { email: params.email },
          });
        } else {
          // メールアドレス情報がない場合は、認証状態をチェックして
          // 適切な画面に遷移（ここでは一旦認証画面に遷移）
          this.navigationRef.navigate('Auth', {
            screen: AuthStackMeta.screens.emailVerify,
            params: { email: '' }, // 空文字列で画面に委任
          });
        }
      }
    } catch (error) {
      console.error('Deep link handling failed:', error);
    }
  }

  /** Deep Linkリスナーを初期化
   *
   * アプリ起動時とフォアグラウンド復帰時のDeep Link処理を設定 */
  initializeDeepLinkListener(): () => void {
    // 初回URL取得（Cold Start時）
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.processDeepLinkUrl(url);
      }
    });

    // URLイベントリスナー登録（Warm Start時）
    const handleUrl = (event: { url: string }) => {
      this.processDeepLinkUrl(event.url);
    };

    const linkingListener = Linking.addEventListener('url', handleUrl);

    // クリーンアップ関数を返す
    return () => {
      linkingListener.remove();
    };
  }

  /** Deep Link URLを処理
   *
   * URLを解析してDeep Link処理を実行するための内部メソッド */
  private async processDeepLinkUrl(url: string): Promise<void> {
    console.log('Processing deep link URL:', url);

    const parseResult = this.parseDeepLinkUrl(url);
    
    if (!parseResult.isValid) {
      console.error('Invalid deep link URL:', parseResult.error);
      return;
    }

    await this.handleDeepLink(parseResult.params);
  }
}

/** メール認証Deep Linkの単一インスタンス */
export const emailVerifyDeepLink = new EmailVerifyDeepLink();
