import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useForgotPasswordHandler } from '@/features/auth/login-page/hooks/useForgotPasswordHandler';

// React Nativeのモック
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn()
  }
}));

describe('useForgotPasswordHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('パスワードリセットハンドラーが正しく動作すること', () => {
    test('パスワードリセット画面への遷移が実行されること', () => {
      // 準備
      const { Alert } = require('react-native');
      
      // 実行
      const { result } = renderHook(() => useForgotPasswordHandler());
      
      result.current();
      
      // 検証
      expect(console.log).toHaveBeenCalledWith('パスワードリセット画面への遷移');
      expect(Alert.alert).toHaveBeenCalledWith(
        'パスワードリセット',
        'パスワードをリセットするための画面へ遷移します。'
      );
    });
  });
});
