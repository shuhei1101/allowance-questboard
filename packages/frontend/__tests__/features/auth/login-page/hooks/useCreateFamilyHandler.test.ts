import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useCreateFamilyHandler } from '@/features/auth/login-page/hooks/useCreateFamilyHandler';

// React Nativeのモック
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn()
  }
}));

describe('useCreateFamilyHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('新規家族作成ハンドラーが正しく動作すること', () => {
    test('新規家族作成画面への遷移が実行されること', () => {
      // 準備
      const { Alert } = require('react-native');
      
      // 実行
      const { result } = renderHook(() => useCreateFamilyHandler());
      
      result.current();
      
      // 検証
      expect(console.log).toHaveBeenCalledWith('新規家族作成画面への遷移');
      expect(Alert.alert).toHaveBeenCalledWith(
        '新規家族作成',
        '新しい家族を作成するための画面へ遷移します。'
      );
    });
  });
});
