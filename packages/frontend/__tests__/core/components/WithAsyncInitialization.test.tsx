import React from 'react';
import { render } from '@testing-library/react-native';
import { WithAsyncInitialization } from '../../../src/core/components/WithAsyncInitialization';
import { Text } from 'react-native';

// テスト用のモックフック
const mockUseInitialization = jest.fn();

describe('WithAsyncInitialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('初期化中はLoadingPageを表示すること', () => {
    // 準備
    mockUseInitialization.mockReturnValue({
      data: undefined,
      isInitializing: true,
      error: undefined,
    });

    const TestChild = jest.fn(() => <Text>テストコンテンツ</Text>);

    // 実行
    const { getByText } = render(
      <WithAsyncInitialization useInitialization={mockUseInitialization}>
        {TestChild}
      </WithAsyncInitialization>
    );

    // 検証
    expect(getByText('データを読み込んでいます...')).toBeTruthy();
    expect(TestChild).not.toHaveBeenCalled();
  });

  it('カスタムローディングメッセージを表示すること', () => {
    // 準備
    mockUseInitialization.mockReturnValue({
      data: undefined,
      isInitializing: true,
      error: undefined,
    });

    const customMessage = "プロフィールを読み込んでいます...";
    const TestChild = jest.fn(() => <Text>テストコンテンツ</Text>);

    // 実行
    const { getByText } = render(
      <WithAsyncInitialization 
        useInitialization={mockUseInitialization}
        loadingMessage={customMessage}
      >
        {TestChild}
      </WithAsyncInitialization>
    );

    // 検証
    expect(getByText(customMessage)).toBeTruthy();
    expect(TestChild).not.toHaveBeenCalled();
  });

  it('データ取得完了後はchildrenを描画すること', () => {
    // 準備
    const testData = { id: '1', name: 'テストユーザー' };
    mockUseInitialization.mockReturnValue({
      data: testData,
      isInitializing: false,
      error: undefined,
    });

    const TestChild = jest.fn((data) => (
      <Text testID="test-content">
        {data.name}
      </Text>
    ));

    // 実行
    const { getByTestId, queryByText } = render(
      <WithAsyncInitialization useInitialization={mockUseInitialization}>
        {TestChild}
      </WithAsyncInitialization>
    );

    // 検証
    expect(queryByText('データを読み込んでいます...')).toBeNull();
    expect(TestChild).toHaveBeenCalledWith(testData);
    expect(getByTestId('test-content')).toBeTruthy();
  });

  it('エラーが発生した場合はthrowすること', () => {
    // 準備
    const testError = new Error('テストエラー');
    mockUseInitialization.mockReturnValue({
      data: undefined,
      isInitializing: false,
      error: testError,
    });

    const TestChild = jest.fn(() => <Text>テストコンテンツ</Text>);

    // 実行と検証
    expect(() => {
      render(
        <WithAsyncInitialization useInitialization={mockUseInitialization}>
          {TestChild}
        </WithAsyncInitialization>
      );
    }).toThrow('テストエラー');

    expect(TestChild).not.toHaveBeenCalled();
  });

  it('データがundefinedの場合はローディング表示すること', () => {
    // 準備
    mockUseInitialization.mockReturnValue({
      data: undefined,
      isInitializing: false,
      error: undefined,
    });

    const TestChild = jest.fn(() => <Text>テストコンテンツ</Text>);

    // 実行
    const { getByText } = render(
      <WithAsyncInitialization useInitialization={mockUseInitialization}>
        {TestChild}
      </WithAsyncInitialization>
    );

    // 検証
    expect(getByText('データを読み込んでいます...')).toBeTruthy();
    expect(TestChild).not.toHaveBeenCalled();
  });
});
