import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useTermsOfServiceHandler } from '@/features/auth/login-page/hooks/useTermsOfServiceHandler';

// React Nativeのモック
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn()
  }
}));

describe('useTermsOfServiceHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('利用規約ハンドラーが正しく動作すること', () => {
    test('利用規約画面への遷移が実行されること', () => {
      // 準備
      const { Alert } = require('react-native');
      
      // 実行
      const { result } = renderHook(() => useTermsOfServiceHandler());
      
      result.current();
      
      // 検証
      expect(console.log).toHaveBeenCalledWith('利用規約画面への遷移');
      expect(Alert.alert).toHaveBeenCalledWith(
        '利用規約',
        '利用規約の内容を確認するための画面へ遷移します。'
      );
    });
  });
});
