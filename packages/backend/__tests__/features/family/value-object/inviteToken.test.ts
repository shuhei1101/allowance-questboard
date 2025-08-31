import { describe, test, expect } from '@jest/globals';
import { InviteToken, InviteTokenSchema } from 'src/features/family/value-object/inviteToken';

describe('InviteToken', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効なトークンでインスタンスが作成されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(64); // 64文字のトークン
      
      // 実行
      const inviteToken = new InviteToken(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(true);
      expect(inviteToken.errorMessage).toBe(undefined);
    });

    test('短すぎるトークン（64文字未満）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(63); // 63文字
      
      // 実行
      const inviteToken = new InviteToken(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(false);
      expect(inviteToken.errorMessage).not.toBe(null);
    });

    test('長すぎるトークン（256文字超過）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(257); // 257文字
      
      // 実行
      const inviteToken = new InviteToken(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(false);
      expect(inviteToken.errorMessage).not.toBe(null);
    });

    test('空文字でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const tokenValue = '';
      
      // 実行
      const inviteToken = new InviteToken(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(false);
      expect(inviteToken.errorMessage).not.toBe(null);
    });

    test('境界値のトークン（64文字）でインスタンスが作成されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(64); // 64文字
      
      // 実行
      const inviteToken = new InviteToken(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(true);
      expect(inviteToken.errorMessage).toBe(undefined);
    });

    test('境界値のトークン（256文字）でインスタンスが作成されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(256); // 256文字
      
      // 実行
      const inviteToken = new InviteToken(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(true);
      expect(inviteToken.errorMessage).toBe(undefined);
    });
  });

  describe('generateメソッドでランダムトークンを生成すること', () => {
    test('generateで生成されたトークンが有効であること', () => {
      // 実行
      const inviteToken = InviteToken.generate();
      
      // 検証
      expect(inviteToken.isValid).toBe(true);
      expect(inviteToken.value.length).toBeGreaterThanOrEqual(64);
      expect(inviteToken.value.length).toBeLessThanOrEqual(256);
      expect(inviteToken.errorMessage).toBe(undefined);
    });

    test('複数回generateを呼び出すと異なるトークンが生成されること', () => {
      // 実行
      const token1 = InviteToken.generate();
      const token2 = InviteToken.generate();
      
      // 検証
      expect(token1.value).not.toBe(token2.value);
      expect(token1.isValid).toBe(true);
      expect(token2.isValid).toBe(true);
    });

    test('generateで生成されたトークンがURL-safe文字のみを含むこと', () => {
      // 実行
      const inviteToken = InviteToken.generate();
      
      // 検証
      // URL-safe Base64は A-Z, a-z, 0-9, -, _ のみを含む
      const urlSafePattern = /^[A-Za-z0-9\-_]+$/;
      expect(urlSafePattern.test(inviteToken.value)).toBe(true);
    });

    test('generateで生成されたトークンが十分な長さを持つこと', () => {
      // 実行
      const inviteToken = InviteToken.generate();
      
      // 検証
      // 48バイトのBase64urlは64文字になる
      expect(inviteToken.value.length).toBe(64);
    });
  });

  describe('fromZodDataメソッドでZodデータからインスタンスを作成すること', () => {
    test('有効なZodデータからインスタンスが作成されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(64);
      
      // 実行
      const inviteToken = InviteToken.fromZodData(tokenValue);
      
      // 検証
      expect(inviteToken.value).toBe(tokenValue);
      expect(inviteToken.isValid).toBe(true);
    });

    test('Zodスキーマによる検証が成功すること', () => {
      // 準備
      const tokenValue = 'a'.repeat(64);
      
      // 実行
      const validationResult = InviteTokenSchema.safeParse(tokenValue);
      
      // 検証
      expect(validationResult.success).toBe(true);
    });

    test('短すぎるトークンでZodスキーマ検証が成功すること', () => {
      // 準備
      const tokenValue = 'a'.repeat(63);
      
      // 実行
      const validationResult = InviteTokenSchema.safeParse(tokenValue);
      
      // 検証
      expect(validationResult.success).toBe(true);
    });
  });

  describe('トークンの形式バリデーション', () => {
    test('様々な有効なトークンが有効であること', () => {
      const validTokens = [
        'a'.repeat(64), // 最小長
        'A'.repeat(64), // 大文字
        '0'.repeat(64), // 数字
        '-'.repeat(64), // ハイフン
        '_'.repeat(64), // アンダースコア
        'aB3-_'.repeat(13) + 'a', // 混合文字（64文字）
        'x'.repeat(128), // 中間長
        'y'.repeat(256), // 最大長
      ];

      validTokens.forEach(tokenValue => {
        // 実行
        const inviteToken = new InviteToken(tokenValue);

        // 検証
        expect(inviteToken.isValid).toBe(true);
      });
    });

    test('無効なトークンが無効であること', () => {
      const invalidTokens = [
        '', // 空文字
        'a'.repeat(63), // 63文字（制限未満）
        'b'.repeat(257), // 257文字（制限超過）
        'c'.repeat(1000), // 1000文字（制限超過）
      ];

      invalidTokens.forEach(tokenValue => {
        // 実行
        const inviteToken = new InviteToken(tokenValue);

        // 検証
        expect(inviteToken.isValid).toBe(false);
      });
    });
  });

  describe('equalsメソッドで等価比較すること', () => {
    test('同じ値のInviteTokenオブジェクト同士がtrueを返すこと', () => {
      // 準備
      const tokenValue = 'a'.repeat(64);
      const token1 = new InviteToken(tokenValue);
      const token2 = new InviteToken(tokenValue);

      // 実行
      const result = token1.equals(token2);

      // 検証
      expect(result).toBe(true);
    });

    test('異なる値のInviteTokenオブジェクト同士がfalseを返すこと', () => {
      // 準備
      const token1 = new InviteToken('a'.repeat(64));
      const token2 = new InviteToken('b'.repeat(64));

      // 実行
      const result = token1.equals(token2);

      // 検証
      expect(result).toBe(false);
    });

    test('InviteTokenオブジェクト以外との比較でfalseを返すこと', () => {
      // 準備
      const tokenValue = 'a'.repeat(64);
      const inviteToken = new InviteToken(tokenValue);
      const other = tokenValue;

      // 実行
      const result = inviteToken.equals(other);

      // 検証
      expect(result).toBe(false);
    });
  });

  describe('toStringメソッドで文字列表現を取得すること', () => {
    test('トークンの値が文字列として返されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(64);
      const inviteToken = new InviteToken(tokenValue);

      // 実行
      const result = inviteToken.toString();

      // 検証
      expect(result).toBe(tokenValue);
    });
  });

  describe('toDebugStringメソッドでデバッグ用文字列を取得すること', () => {
    test('有効なトークンのデバッグ文字列が返されること', () => {
      // 準備
      const tokenValue = 'a'.repeat(64);
      const inviteToken = new InviteToken(tokenValue);

      // 実行
      const result = inviteToken.toDebugString();

      // 検証
      expect(result).toContain('valueName: 招待トークン');
      expect(result).toContain(`value: ${tokenValue}`);
      expect(result).toContain('errorMessage: undefined');
    });

    test('無効なトークンのデバッグ文字列が返されること', () => {
      // 準備
      const tokenValue = 'short';
      const inviteToken = new InviteToken(tokenValue);

      // 実行
      const result = inviteToken.toDebugString();

      // 検証
      expect(result).toContain('valueName: 招待トークン');
      expect(result).toContain('value: short');
      expect(result).not.toContain('errorMessage: undefined');
    });
  });
});
