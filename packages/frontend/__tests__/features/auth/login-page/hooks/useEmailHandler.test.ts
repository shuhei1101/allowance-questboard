import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useEmailHandler } from '@/features/auth/login-page/hooks/useEmailHandler';
import { LoginForm } from '@/features/auth/login-page/models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';

describe('useEmailHandler', () => {
  describe('メール変更ハンドラーが正しく動作すること', () => {
    test('有効なメールアドレスが入力された時にupdateLoginFormが呼び出されること', () => {
      // 準備
      const existingLoginForm = new LoginForm({
        email: new Email('old@example.com'),
        password: new Password('password123')
      });
      const mockUpdateLoginForm = jest.fn();
      const mockSetEmailError = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useEmailHandler({
          loginForm: existingLoginForm,
          updateLoginForm: mockUpdateLoginForm,
          getEmailError: null,
          setEmailError: mockSetEmailError
        })
      );
      
      result.current('new@example.com');
      
      // 検証
      expect(mockUpdateLoginForm).toHaveBeenCalledTimes(1);
      const calledLoginForm = mockUpdateLoginForm.mock.calls[0][0] as LoginForm;
      expect(calledLoginForm.email.value).toBe('new@example.com');
      expect(calledLoginForm.password.value).toBe('password123');
    });

    test('既存のエラーがある場合にsetEmailErrorでnullが設定されること', () => {
      // 準備
      const existingLoginForm = new LoginForm({
        email: new Email('test@example.com'),
        password: new Password('password123')
      });
      const mockUpdateLoginForm = jest.fn();
      const mockSetEmailError = jest.fn();
      const existingError = 'メールアドレスが無効です';
      
      // 実行
      const { result } = renderHook(() =>
        useEmailHandler({
          loginForm: existingLoginForm,
          updateLoginForm: mockUpdateLoginForm,
          getEmailError: existingError,
          setEmailError: mockSetEmailError
        })
      );
      
      result.current('new@example.com');
      
      // 検証
      expect(mockSetEmailError).toHaveBeenCalledWith(null);
    });

    test('既存のエラーがない場合にsetEmailErrorが呼び出されないこと', () => {
      // 準備
      const existingLoginForm = new LoginForm({
        email: new Email('test@example.com'),
        password: new Password('password123')
      });
      const mockUpdateLoginForm = jest.fn();
      const mockSetEmailError = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        useEmailHandler({
          loginForm: existingLoginForm,
          updateLoginForm: mockUpdateLoginForm,
          getEmailError: null,
          setEmailError: mockSetEmailError
        })
      );
      
      result.current('new@example.com');
      
      // 検証
      expect(mockSetEmailError).not.toHaveBeenCalled();
    });
  });
});
