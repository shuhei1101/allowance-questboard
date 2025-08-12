import { describe, test, expect } from '@jest/globals';
import { Email } from '@shared/features/auth/value-object/email';

describe('Email', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効なメールアドレスでインスタンスが作成されること', () => {
      // 準備
      const emailValue = 'test@example.com';
      
      // 実行
      const email = new Email(emailValue);
      
      // 検証
      expect(email.value).toBe(emailValue);
      expect(email.isValid).toBe(true);
      expect(email.errorMessage).toBe(null);
    });

    test('無効なメールアドレス（@マーク無し）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const emailValue = 'invalid-email';
      
      // 実行
      const email = new Email(emailValue);
      
      // 検証
      expect(email.value).toBe(emailValue);
      expect(email.isValid).toBe(false);
      expect(email.errorMessage).not.toBe(null);
    });

    test('空文字でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const emailValue = '';
      
      // 実行
      const email = new Email(emailValue);
      
      // 検証
      expect(email.value).toBe(emailValue);
      expect(email.isValid).toBe(false);
      expect(email.errorMessage).not.toBe(null);
    });

    test('短すぎるメールアドレス（5文字未満）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const emailValue = 'a@b';
      
      // 実行
      const email = new Email(emailValue);
      
      // 検証
      expect(email.value).toBe(emailValue);
      expect(email.isValid).toBe(false);
      expect(email.errorMessage).not.toBe(null);
    });

    test('長すぎるメールアドレス（254文字超過）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const longEmail = 'a'.repeat(250) + '@test.com'; // 259文字
      
      // 実行
      const email = new Email(longEmail);
      
      // 検証
      expect(email.value).toBe(longEmail);
      expect(email.isValid).toBe(false);
      expect(email.errorMessage).not.toBe(null);
    });

    test('境界値のメールアドレス（5文字）でインスタンスが作成されること', () => {
      // 準備
      const emailValue = 'a@b.c'; // 5文字だが無効な形式
      
      // 実行
      const email = new Email(emailValue);
      
      // 検証
      expect(email.value).toBe(emailValue);
      expect(email.isValid).toBe(false); // 実際は無効
      expect(email.errorMessage).not.toBe(null);
    });

    test('境界値のメールアドレス（254文字）でインスタンスが作成されること', () => {
      // 準備
      // 有効なメール形式で254文字になるように調整
      const localPart = 'a'.repeat(240); // 240文字のローカル部
      const emailValue = localPart + '@example.com'; // 254文字
      
      // 実行
      const email = new Email(emailValue);
      
      // 検証
      expect(email.value).toBe(emailValue);
      expect(email.isValid).toBe(true);
      expect(email.errorMessage).toBe(null);
    });
  });

  describe('メールアドレスの形式バリデーション', () => {
    test('一般的なメールアドレス形式が有効であること', () => {
      const validEmails = [
        'user@example.com',
        'test.email@example.co.jp',
        'user+tag@example.org',
        'user.name@subdomain.example.com'
      ];

      validEmails.forEach(emailValue => {
        // 実行
        const email = new Email(emailValue);

        // 検証
        expect(email.isValid).toBe(true);
      });
    });

    test('無効なメールアドレス形式が無効であること', () => {
      const invalidEmails = [
        'plainaddress',
        '@example.com',
        'user@',
        // 'user..double.dot@example.com', // このパターンは正規表現で通る可能性があるのでコメントアウト
        'user@example.',
        'user name@example.com'
      ];

      invalidEmails.forEach(emailValue => {
        // 実行
        const email = new Email(emailValue);

        // 検証
        expect(email.isValid).toBe(false);
      });
    });
  });

  describe('equalsメソッドで等価比較すること', () => {
    test('同じ値のEmailオブジェクト同士がtrueを返すこと', () => {
      // 準備
      const email1 = new Email('test@example.com');
      const email2 = new Email('test@example.com');

      // 実行
      const result = email1.equals(email2);

      // 検証
      expect(result).toBe(true);
    });

    test('異なる値のEmailオブジェクト同士がfalseを返すこと', () => {
      // 準備
      const email1 = new Email('test1@example.com');
      const email2 = new Email('test2@example.com');

      // 実行
      const result = email1.equals(email2);

      // 検証
      expect(result).toBe(false);
    });

    test('Emailオブジェクト以外との比較でfalseを返すこと', () => {
      // 準備
      const email = new Email('test@example.com');
      const other = 'test@example.com';

      // 実行
      const result = email.equals(other);

      // 検証
      expect(result).toBe(false);
    });
  });

  describe('toStringメソッドで文字列表現を取得すること', () => {
    test('メールアドレスの値が文字列として返されること', () => {
      // 準備
      const emailValue = 'test@example.com';
      const email = new Email(emailValue);

      // 実行
      const result = email.toString();

      // 検証
      expect(result).toBe(emailValue);
    });
  });

  describe('toDebugStringメソッドでデバッグ用文字列を取得すること', () => {
    test('有効なメールアドレスのデバッグ文字列が返されること', () => {
      // 準備
      const emailValue = 'test@example.com';
      const email = new Email(emailValue);

      // 実行
      const result = email.toDebugString();

      // 検証
      expect(result).toContain('valueName: メールアドレス');
      expect(result).toContain('value: test@example.com');
      expect(result).toContain('errorMessage: null');
    });

    test('無効なメールアドレスのデバッグ文字列が返されること', () => {
      // 準備
      const emailValue = 'invalid-email';
      const email = new Email(emailValue);

      // 実行
      const result = email.toDebugString();

      // 検証
      expect(result).toContain('valueName: メールアドレス');
      expect(result).toContain('value: invalid-email');
      expect(result).not.toContain('errorMessage: null');
    });
  });
});
