import { describe, test, expect, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { useLoginHandler } from '@/features/auth/login-page/hooks/useLoginHandler';
import { LoginForm } from '@/features/auth/login-page/models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { LanguageType } from '@backend/features/language/enum/languageType';

// Supabaseのモック
jest.mock('@/core/supabase/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn()
    }
  }
}));

// loginサービスのモック
jest.mock('@/features/auth/login-page/services/login', () => ({
  login: jest.fn()
}));

// React Nativeのモック
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn()
  }
}));

describe('useLoginHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('ログインハンドラーが正しく動作すること', () => {
    test('バリデーションエラーがある場合にエラーが設定されること', async () => {
      // 準備
      const invalidEmail = new Email('');
      const invalidPassword = new Password('');
      const loginForm = new LoginForm({
        email: invalidEmail,
        password: invalidPassword
      });
      
      const mockClearErrors = jest.fn();
      const mockSetEmailError = jest.fn();
      const mockSetPasswordError = jest.fn();
      const mockSetLoading = jest.fn();
      const mockShowDialog = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType: LanguageType.JAPANESE,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog
        })
      );
      
      await result.current();
      
      // 検証
      expect(mockClearErrors).toHaveBeenCalledTimes(1);
      expect(mockSetEmailError).toHaveBeenCalled();
      expect(mockSetPasswordError).toHaveBeenCalled();
      expect(mockSetLoading).not.toHaveBeenCalled();
    });

    test('正常なログインが成功すること', async () => {
      // 準備
      const validEmail = new Email('test@example.com');
      const validPassword = new Password('password123');
      const loginForm = new LoginForm({
        email: validEmail,
        password: validPassword
      });
      
      const mockClearErrors = jest.fn();
      const mockSetEmailError = jest.fn();
      const mockSetPasswordError = jest.fn();
      const mockSetLoading = jest.fn();
      const mockShowDialog = jest.fn();
      
      const { supabase } = require('@/core/supabase/supabase');
      const { login } = require('@/features/auth/login-page/services/login');
      
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          session: {
            access_token: 'mock-jwt-token'
          }
        },
        error: null
      });
      
      login.mockResolvedValue(undefined);
      
      // 実行
      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType: LanguageType.JAPANESE,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog
        })
      );
      
      await result.current();
      
      // 検証
      await waitFor(() => {
        expect(mockClearErrors).toHaveBeenCalledTimes(1);
        expect(mockSetLoading).toHaveBeenCalledWith(true);
        expect(mockSetLoading).toHaveBeenCalledWith(false);
        expect(mockShowDialog).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledTimes(1);
      });
    });

    test('Supabaseエラーが発生した場合にアラートが表示されること', async () => {
      // 準備
      const validEmail = new Email('test@example.com');
      const validPassword = new Password('password123');
      const loginForm = new LoginForm({
        email: validEmail,
        password: validPassword
      });
      
      const mockClearErrors = jest.fn();
      const mockSetEmailError = jest.fn();
      const mockSetPasswordError = jest.fn();
      const mockSetLoading = jest.fn();
      const mockShowDialog = jest.fn();
      
      const { supabase } = require('@/core/supabase/supabase');
      const { Alert } = require('react-native');
      
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' }
      });
      
      // 実行
      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType: LanguageType.JAPANESE,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog
        })
      );
      
      await result.current();
      
      // 検証
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalled();
        expect(mockSetLoading).toHaveBeenCalledWith(false);
      });
    });

    test('JWTトークンが取得できない場合にアラートが表示されること', async () => {
      // 準備
      const validEmail = new Email('test@example.com');
      const validPassword = new Password('password123');
      const loginForm = new LoginForm({
        email: validEmail,
        password: validPassword
      });
      
      const mockClearErrors = jest.fn();
      const mockSetEmailError = jest.fn();
      const mockSetPasswordError = jest.fn();
      const mockSetLoading = jest.fn();
      const mockShowDialog = jest.fn();
      
      const { supabase } = require('@/core/supabase/supabase');
      const { Alert } = require('react-native');
      
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          session: null
        },
        error: null
      });
      
      // 実行
      const { result } = renderHook(() =>
        useLoginHandler({
          loginForm,
          currentLanguageType: LanguageType.JAPANESE,
          clearErrors: mockClearErrors,
          setEmailError: mockSetEmailError,
          setPasswordError: mockSetPasswordError,
          setLoading: mockSetLoading,
          showDialog: mockShowDialog
        })
      );
      
      await result.current();
      
      // 検証
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalled();
        expect(mockSetLoading).toHaveBeenCalledWith(false);
      });
    });
  });
});
