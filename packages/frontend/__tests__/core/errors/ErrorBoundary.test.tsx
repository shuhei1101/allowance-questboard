import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ErrorBoundary } from '@/core/errors/ErrorBoundary';

// テスト用のエラーを発生させるコンポーネント
const ThrowErrorComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('テストエラーです');
  }
  return <Text>正常なコンポーネント</Text>;
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // console.errorをスパイして出力を抑制
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('正常なコンポーネントを正しく表示すること', () => {
    // 準備・実行
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // 検証
    expect(getByText('正常なコンポーネント')).toBeTruthy();
  });

  it('エラーが発生した場合にErrorScreenを表示すること', () => {
    // 準備・実行
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // 検証
    expect(getByText(/エラーが発生しました/)).toBeTruthy();
  });

  it('カスタムフォールバックUIが指定されている場合はそれを表示すること', () => {
    // 準備
    const customFallback = (error: Error, resetError: () => void) => (
      <View>
        <Text>カスタムエラー画面</Text>
        <Text>エラーメッセージ: {error.message}</Text>
      </View>
    );

    // 実行
    const { getByText } = render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // 検証
    expect(getByText('カスタムエラー画面')).toBeTruthy();
    expect(getByText('エラーメッセージ: テストエラーです')).toBeTruthy();
  });

  it('onErrorコールバックが呼び出されること', () => {
    // 準備
    const onErrorMock = jest.fn();

    // 実行
    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // 検証
    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'テストエラーです'
      }),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    );
  });

  it('console.errorでエラーログが出力されること', () => {
    // 実行
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // 検証
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '🚨 ErrorBoundary caught an error:',
      expect.objectContaining({
        message: 'テストエラーです'
      })
    );
  });
});
