import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useChildLoginHandler } from '@/features/auth/login-page/hooks/useChildLoginHandler';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

// useTranslationのモック
jest.mock('@/core/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: jest.fn((key: string) => {
      const translations: Record<string, string> = {
        'common.success': 'Success',
        'common.error': 'Error',
        'login.success.childLogin': 'Child login successful',
        'login.errors.childLoginFailed': 'Child login failed'
      };
      return translations[key] || key;
    })
  })
}));

// React Nativeのモック
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn()
  }
}));

describe('useChildLoginHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // console.logのモック
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('子供ログインハンドラーが正しく動作すること', () => {
    test('正常な子供ログインが実行されること', () => {
      // 準備
      const mockUpdateFamilyMemberType = jest.fn();
      const mockHideDialog = jest.fn();
      const mocksetLoginForm = jest.fn();
      const mockSetLoading = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useChildLoginHandler({
          updateFamilyMemberType: mockUpdateFamilyMemberType,
          hideDialog: mockHideDialog,
          setLoginForm: mocksetLoginForm,
          setLoading: mockSetLoading
        })
      );
      
      result.current();
      
      // 検証
      expect(mockUpdateFamilyMemberType).toHaveBeenCalledWith(FamilyMemberType.CHILD);
      expect(mockHideDialog).toHaveBeenCalledTimes(1);
      expect(mocksetLoginForm).toHaveBeenCalledTimes(1);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    test('エラーが発生した場合にエラーアラートが表示されること', () => {
      // 準備
      const mockUpdateFamilyMemberType = jest.fn(() => {
        throw new Error('テストエラー');
      });
      const mockHideDialog = jest.fn();
      const mocksetLoginForm = jest.fn();
      const mockSetLoading = jest.fn();
      const { Alert } = require('react-native');
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // 実行
      const { result } = renderHook(() =>
        useChildLoginHandler({
          updateFamilyMemberType: mockUpdateFamilyMemberType,
          hideDialog: mockHideDialog,
          setLoginForm: mocksetLoginForm,
          setLoading: mockSetLoading
        })
      );
      
      result.current();
      
      // 検証
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Child login failed');
      expect(console.error).toHaveBeenCalled();
    });
  });
});
