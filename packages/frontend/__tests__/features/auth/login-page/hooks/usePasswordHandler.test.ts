import { describe, test, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { usePasswordHandler } from '@/features/auth/login-page/hooks/usePasswordHandler';
import { LoginForm } from '@/features/auth/login-page/models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';

describe('usePasswordHandler', () => {
  describe('パスワード変更ハンドラーが正しく動作すること', () => {
    test('新しいパスワードが入力された時にupdateLoginFormが呼び出されること', () => {
      // 準備
      const existingLoginForm = new LoginForm({
        email: new Email('test@example.com'),
        password: new Password('oldPassword')
      });
      const mockUpdateLoginForm = jest.fn();
      const mockSetPasswordError = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        usePasswordHandler({
          loginForm: existingLoginForm,
          updateLoginForm: mockUpdateLoginForm,
          passwordError: null,
          setPasswordError: mockSetPasswordError
        })
      );
      
      result.current('newPassword123');
      
      // 検証
      expect(mockUpdateLoginForm).toHaveBeenCalledTimes(1);
      const calledLoginForm = mockUpdateLoginForm.mock.calls[0][0] as LoginForm;
      expect(calledLoginForm.email.value).toBe('test@example.com');
      expect(calledLoginForm.password.value).toBe('newPassword123');
    });

    test('既存のエラーがある場合にsetPasswordErrorでnullが設定されること', () => {
      // 準備
      const existingLoginForm = new LoginForm({
        email: new Email('test@example.com'),
        password: new Password('password123')
      });
      const mockUpdateLoginForm = jest.fn();
      const mockSetPasswordError = jest.fn();
      const existingError = 'パスワードが短すぎます';
      
      // 実行
      const { result } = renderHook(() =>
        usePasswordHandler({
          loginForm: existingLoginForm,
          updateLoginForm: mockUpdateLoginForm,
          passwordError: existingError,
          setPasswordError: mockSetPasswordError
        })
      );
      
      result.current('newPassword123');
      
      // 検証
      expect(mockSetPasswordError).toHaveBeenCalledWith(null);
    });

    test('既存のエラーがない場合にsetPasswordErrorが呼び出されないこと', () => {
      // 準備
      const existingLoginForm = new LoginForm({
        email: new Email('test@example.com'),
        password: new Password('password123')
      });
      const mockUpdateLoginForm = jest.fn();
      const mockSetPasswordError = jest.fn();
      
      // 実行
      const { result } = renderHook(() =>
        usePasswordHandler({
          loginForm: existingLoginForm,
          updateLoginForm: mockUpdateLoginForm,
          passwordError: null,
          setPasswordError: mockSetPasswordError
        })
      );
      
      result.current('newPassword123');
      
      // 検証
      expect(mockSetPasswordError).not.toHaveBeenCalled();
    });
  });
});
