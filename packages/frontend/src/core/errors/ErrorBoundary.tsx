import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from 'react-native';
import { ErrorScreen } from './error-page';

interface Props {
  children: ReactNode;
  /** エラー発生時のフォールバックUI */
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  /** エラー発生時のコールバック */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * アプリケーション全体のエラーバウンダリー
 * 
 * React コンポーネント内で発生した予期しないエラーをキャッチし、
 * エラー画面を表示してアプリのクラッシュを防ぐ
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  /**
   * エラーが発生した際に呼び出される
   * コンポーネントの状態を更新してエラー画面を表示
   */
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * エラー情報をログに記録し、カスタムエラーハンドリングを実行
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 ErrorBoundary caught an error:', error);
    console.error('Error details:', errorInfo);

    // カスタムエラーハンドリング実行
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 開発環境では詳細なエラー情報をアラートで表示
    if (__DEV__) {
      Alert.alert(
        'Development Error',
        `${error.message}\n\nComponent Stack:\n${errorInfo.componentStack}`,
        [{ text: 'OK' }]
      );
    }
  }

  /**
   * エラー状態をリセットしてアプリを復旧
   */
  private resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // カスタムフォールバックUIが指定されている場合
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      // デフォルトのエラー画面を表示
      return (
        <ErrorScreen 
          error={this.state.error}
          onRetry={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}
