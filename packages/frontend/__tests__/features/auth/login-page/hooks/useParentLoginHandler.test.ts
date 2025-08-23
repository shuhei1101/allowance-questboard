import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useParentLoginHandler } from '@/features/auth/login-page/hooks/useParentLoginHandler';
import { FamilyMemberType } from '@backend/features/family-member/enum/familyMemberType';

// useTranslationのモック
jest.mock('@/core/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: jest.fn((key: string) => {
      const translations: Record<string, string> = {
        'common.success': 'Success',
        'common.error': 'Error',
        'login.success.parentLogin': 'Parent login successful',
        'login.errors.parentLoginFailed': 'Parent login failed'
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

describe('useParentLoginHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // console.logのモック
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('親ログインハンドラーが正しく動作すること', () => {
    test('正常な親ログインが実行されること', () => {
      // 準備
      const mockUpdateFamilyMemberType = jest.fn();
      const mockHideDialog = jest.fn();
      const mocksetLoginForm = jest.fn();
      const mockSetLoading = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useParentLoginHandler({
          updateFamilyMemberType: mockUpdateFamilyMemberType,
          hideDialog: mockHideDialog,
          setLoginForm: mocksetLoginForm,
          setLoading: mockSetLoading
        })
      );
      
      result.current();
      
      // 検証
      expect(mockUpdateFamilyMemberType).toHaveBeenCalledWith(FamilyMemberType.PARENT);
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
        useParentLoginHandler({
          updateFamilyMemberType: mockUpdateFamilyMemberType,
          hideDialog: mockHideDialog,
          setLoginForm: mocksetLoginForm,
          setLoading: mockSetLoading
        })
      );
      
      result.current();
      
      // 検証
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Parent login failed');
      expect(console.error).toHaveBeenCalled();
    });
  });
});
