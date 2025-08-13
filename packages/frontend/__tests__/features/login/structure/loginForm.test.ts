import { describe, test, expect } from '@jest/globals';
import { LoginForm, LoginFormData } from '@/features/login/structure/loginForm';

describe('LoginForm', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効なメールアドレスとパスワードでインスタンスが作成されること', () => {
      // 準備
      const data: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const loginForm = new LoginForm(data);

      // 検証
      expect(loginForm.email.value).toBe('test@example.com');
      expect(loginForm.password.value).toBe('password123');
      expect(loginForm.email.isValid).toBe(true);
      expect(loginForm.password.isValid).toBe(true);
    });

    test('無効なメールアドレスでインスタンスが作成されること', () => {
      // 準備
      const data: LoginFormData = {
        email: 'invalid-email',
        password: 'password123'
      };

      // 実行
      const loginForm = new LoginForm(data);

      // 検証
      expect(loginForm.email.value).toBe('invalid-email');
      expect(loginForm.password.value).toBe('password123');
      expect(loginForm.email.isValid).toBe(false);
      expect(loginForm.password.isValid).toBe(true);
    });

    test('無効なパスワードでインスタンスが作成されること', () => {
      // 準備
      const data: LoginFormData = {
        email: 'test@example.com',
        password: '123'
      };

      // 実行
      const loginForm = new LoginForm(data);

      // 検証
      expect(loginForm.email.value).toBe('test@example.com');
      expect(loginForm.password.value).toBe('123');
      expect(loginForm.email.isValid).toBe(true);
      expect(loginForm.password.isValid).toBe(false);
    });
  });

  describe('isValidメソッドで有効性を判定すること', () => {
    test('メールアドレスとパスワードが両方有効な場合trueを返すこと', () => {
      // 準備
      const data: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };
      const loginForm = new LoginForm(data);

      // 実行
      const result = loginForm.isValid();

      // 検証
      expect(result).toBe(true);
    });

    test('メールアドレスが無効な場合falseを返すこと', () => {
      // 準備
      const data: LoginFormData = {
        email: 'invalid-email',
        password: 'password123'
      };
      const loginForm = new LoginForm(data);

      // 実行
      const result = loginForm.isValid();

      // 検証
      expect(result).toBe(false);
    });

    test('パスワードが無効な場合falseを返すこと', () => {
      // 準備
      const data: LoginFormData = {
        email: 'test@example.com',
        password: '123'
      };
      const loginForm = new LoginForm(data);

      // 実行
      const result = loginForm.isValid();

      // 検証
      expect(result).toBe(false);
    });

    test('メールアドレスとパスワードの両方が無効な場合falseを返すこと', () => {
      // 準備
      const data: LoginFormData = {
        email: 'invalid-email',
        password: '123'
      };
      const loginForm = new LoginForm(data);

      // 実行
      const result = loginForm.isValid();

      // 検証
      expect(result).toBe(false);
    });
  });

  describe('createSafelyメソッドで安全にインスタンスを作成すること', () => {
    test('有効なデータで作成されること', () => {
      // 準備
      const data: LoginFormData = {
        email: 'test@example.com',
        password: 'password123'
      };

      // 実行
      const loginForm = LoginForm.createSafely(data);

      // 検証
      expect(loginForm).toBeInstanceOf(LoginForm);
      expect(loginForm.isValid()).toBe(true);
    });

    test('無効なデータでも例外を投げずに作成されること', () => {
      // 準備
      const data: LoginFormData = {
        email: 'invalid-email',
        password: '123'
      };

      // 実行
      const loginForm = LoginForm.createSafely(data);

      // 検証
      expect(loginForm).toBeInstanceOf(LoginForm);
      expect(loginForm.isValid()).toBe(false);
    });
  });

  describe('createInitialDataメソッドで初期データを作成すること', () => {
    test('空の初期データが作成されること', () => {
      // 実行
      const initialData = LoginForm.createInitialData();

      // 検証
      expect(initialData.email).toBe('');
      expect(initialData.password).toBe('');
    });
  });
});
