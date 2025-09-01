import React from 'react';
import { render } from '@testing-library/react-native';
import { WithAuthenticatedRouter } from '../../../src/core/components/WithAuthenticatedRouter';
import { useAuthenticatedRouter } from '../../../src/core/hooks/useAuthenticatedRouter';
import { Text } from 'react-native';

// useAuthenticatedRouterのモック
jest.mock('../../../src/core/hooks/useAuthenticatedRouter');
const mockUseAuthenticatedRouter = useAuthenticatedRouter as jest.MockedFunction<typeof useAuthenticatedRouter>;

describe('WithAuthenticatedRouter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('初期化中はLoadingPageを表示すること', () => {
    // 準備
    mockUseAuthenticatedRouter.mockReturnValue({
      data: undefined,
      isInitializing: true,
      error: undefined,
    });

    const TestChild = jest.fn(() => <Text>テストコンテンツ</Text>);

    // 実行
    const { getByText } = render(
      <WithAuthenticatedRouter>
        {TestChild}
      </WithAuthenticatedRouter>
    );

    // 検証
    expect(getByText('アプリを初期化しています...')).toBeTruthy();
    expect(TestChild).not.toHaveBeenCalled();
  });

  it('カスタムローディングメッセージを表示すること', () => {
    // 準備
    mockUseAuthenticatedRouter.mockReturnValue({
      data: undefined,
      isInitializing: true,
      error: undefined,
    });

    const customMessage = "ログイン画面を準備しています...";
    const TestChild = jest.fn(() => <Text>テストコンテンツ</Text>);

    // 実行
    const { getByText } = render(
      <WithAuthenticatedRouter loadingMessage={customMessage}>
        {TestChild}
      </WithAuthenticatedRouter>
    );

    // 検証
    expect(getByText(customMessage)).toBeTruthy();
    expect(TestChild).not.toHaveBeenCalled();
  });

  it('router初期化完了後はchildrenを描画すること', () => {
    // 準備
    const mockRouter = { query: jest.fn() } as any;
    mockUseAuthenticatedRouter.mockReturnValue({
      data: mockRouter,
      isInitializing: false,
      error: undefined,
    });

    const TestChild = jest.fn((router) => <Text testID="test-content">テストコンテンツ: {router.query ? 'routerあり' : 'routerなし'}</Text>);

    // 実行
    const { getByTestId, queryByText } = render(
      <WithAuthenticatedRouter>
        {TestChild}
      </WithAuthenticatedRouter>
    );

    // 検証
    expect(queryByText('アプリを初期化しています...')).toBeNull();
    expect(TestChild).toHaveBeenCalledWith(mockRouter);
    expect(getByTestId('test-content')).toBeTruthy();
  });
});
