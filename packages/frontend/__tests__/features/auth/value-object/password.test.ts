import { describe, test, expect } from '@jest/globals';
import { Password } from '@backend/features/auth/value-object/password';

describe('Password', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効なパスワードでインスタンスが作成されること', () => {
      // 準備
      const passwordValue = 'password123';
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(true);
      expect(password.errorMessage).toBe(null);
    });

    test('空文字でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const passwordValue = '';
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(false);
      expect(password.errorMessage).not.toBe(null);
    });

    test('短すぎるパスワード（8文字未満）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const passwordValue = '1234567';
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(false);
      expect(password.errorMessage).not.toBe(null);
    });

    test('長すぎるパスワード（128文字超過）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const passwordValue = 'a'.repeat(129); // 129文字
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(false);
      expect(password.errorMessage).not.toBe(null);
    });

    test('境界値のパスワード（8文字）でインスタンスが作成されること', () => {
      // 準備
      const passwordValue = 'pass123a'; // 8文字
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(true);
      expect(password.errorMessage).toBe(null);
    });

    test('境界値のパスワード（128文字）でインスタンスが作成されること', () => {
      // 準備
      const passwordValue = 'a'.repeat(127) + '1'; // 128文字（英数字混合）
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(true);
      expect(password.errorMessage).toBe(null);
    });

    test('英字のみのパスワードでインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const passwordValue = 'onlyalphabets';
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(false);
      expect(password.errorMessage).not.toBe(null);
    });

    test('数字のみのパスワードでインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const passwordValue = '12345678';
      
      // 実行
      const password = new Password(passwordValue);
      
      // 検証
      expect(password.value).toBe(passwordValue);
      expect(password.isValid).toBe(false);
      expect(password.errorMessage).not.toBe(null);
    });
  });

  describe('パスワードの形式バリデーション', () => {
    test('英数字混合の有効なパスワード形式が有効であること', () => {
      const validPasswords = [
        'password123',
        'abc123def',
        'Test123Password',
        '123abc456def',
        'mypassword1'
      ];

      validPasswords.forEach(passwordValue => {
        // 実行
        const password = new Password(passwordValue);

        // 検証
        expect(password.isValid).toBe(true);
      });
    });

    test('英数字混合でない無効なパスワード形式が無効であること', () => {
      const invalidPasswords = [
        'onlyalphabets',
        '123456789',
        'ひらがなぱすわーど123',
        'PASSWORD',
        'password'
      ];

      invalidPasswords.forEach(passwordValue => {
        // 実行
        const password = new Password(passwordValue);

        // 検証
        expect(password.isValid).toBe(false);
      });
    });

    test('特殊文字を含む英数字混合パスワードが有効であること', () => {
      const passwordsWithSymbols = [
        'pass123!',
        'my@password1',
        'test#123abc',
        'password123$'
      ];

      passwordsWithSymbols.forEach(passwordValue => {
        // 実行
        const password = new Password(passwordValue);

        // 検証
        expect(password.isValid).toBe(true);
      });
    });
  });

  describe('equalsメソッドで等価比較すること', () => {
    test('同じ値のPasswordオブジェクト同士がtrueを返すこと', () => {
      // 準備
      const password1 = new Password('password123');
      const password2 = new Password('password123');

      // 実行
      const result = password1.equals(password2);

      // 検証
      expect(result).toBe(true);
    });

    test('異なる値のPasswordオブジェクト同士がfalseを返すこと', () => {
      // 準備
      const password1 = new Password('password123');
      const password2 = new Password('differentpass456');

      // 実行
      const result = password1.equals(password2);

      // 検証
      expect(result).toBe(false);
    });

    test('Passwordオブジェクト以外との比較でfalseを返すこと', () => {
      // 準備
      const password = new Password('password123');
      const other = 'password123';

      // 実行
      const result = password.equals(other);

      // 検証
      expect(result).toBe(false);
    });
  });

  describe('toStringメソッドで文字列表現を取得すること', () => {
    test('パスワードの値が文字列として返されること', () => {
      // 準備
      const passwordValue = 'password123';
      const password = new Password(passwordValue);

      // 実行
      const result = password.toString();

      // 検証
      expect(result).toBe(passwordValue);
    });
  });

  describe('toDebugStringメソッドでデバッグ用文字列を取得すること', () => {
    test('有効なパスワードのデバッグ文字列が返されること', () => {
      // 準備
      const passwordValue = 'password123';
      const password = new Password(passwordValue);

      // 実行
      const result = password.toDebugString();

      // 検証
      expect(result).toContain('valueName: パスワード');
      expect(result).toContain('value: password123');
      expect(result).toContain('errorMessage: null');
    });

    test('無効なパスワードのデバッグ文字列が返されること', () => {
      // 準備
      const passwordValue = '123';
      const password = new Password(passwordValue);

      // 実行
      const result = password.toDebugString();

      // 検証
      expect(result).toContain('valueName: パスワード');
      expect(result).toContain('value: 123');
      expect(result).not.toContain('errorMessage: null');
    });
  });
});
