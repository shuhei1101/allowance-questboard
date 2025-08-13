import { describe, test, expect } from '@jest/globals';
import { FamilyName } from '@backend/features/family/entity/value-object/familyName';

describe('FamilyName', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効な家族名でインスタンスが作成されること', () => {
      // 準備
      const familyNameValue = '田中家';
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(true);
      expect(familyName.errorMessage).toBe(null);
    });

    test('空文字でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const familyNameValue = '';
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(false);
      expect(familyName.errorMessage).not.toBe(null);
    });

    test('長すぎる家族名（20文字超過）でインスタンスが作成されエラーメッセージが設定されること', () => {
      // 準備
      const familyNameValue = 'あ'.repeat(21); // 21文字
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(false);
      expect(familyName.errorMessage).not.toBe(null);
    });

    test('境界値の家族名（1文字）でインスタンスが作成されること', () => {
      // 準備
      const familyNameValue = 'あ'; // 1文字
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(true);
      expect(familyName.errorMessage).toBe(null);
    });

    test('境界値の家族名（20文字）でインスタンスが作成されること', () => {
      // 準備
      const familyNameValue = 'あ'.repeat(20); // 20文字
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(true);
      expect(familyName.errorMessage).toBe(null);
    });

    test('英数字の家族名でインスタンスが作成されること', () => {
      // 準備
      const familyNameValue = 'Smith Family';
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(true);
      expect(familyName.errorMessage).toBe(null);
    });

    test('漢字・ひらがな・カタカナの家族名でインスタンスが作成されること', () => {
      // 準備
      const familyNameValue = '田中ファミリー';
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(true);
      expect(familyName.errorMessage).toBe(null);
    });

    test('記号を含む家族名でインスタンスが作成されること', () => {
      // 準備
      const familyNameValue = '田中家★';
      
      // 実行
      const familyName = new FamilyName(familyNameValue);
      
      // 検証
      expect(familyName.value).toBe(familyNameValue);
      expect(familyName.isValid).toBe(true);
      expect(familyName.errorMessage).toBe(null);
    });
  });

  describe('家族名の形式バリデーション', () => {
    test('様々な有効な家族名が有効であること', () => {
      const validFamilyNames = [
        '田中家',
        'Smith',
        'Johnson Family',
        'さくら家',
        'ヤマダファミリー',
        '鈴木',
        '1番家',
        'My家',
        'あいうえおかきくけこさしすせそ' // 20文字
      ];

      validFamilyNames.forEach(familyNameValue => {
        // 実行
        const familyName = new FamilyName(familyNameValue);

        // 検証
        expect(familyName.isValid).toBe(true);
      });
    });

    test('無効な家族名が無効であること', () => {
      const invalidFamilyNames = [
        '', // 空文字
        'あ'.repeat(21), // 21文字（制限超過）
        'い'.repeat(25), // 25文字（制限超過）
        'う'.repeat(100) // 100文字（制限超過）
      ];

      invalidFamilyNames.forEach(familyNameValue => {
        // 実行
        const familyName = new FamilyName(familyNameValue);

        // 検証
        expect(familyName.isValid).toBe(false);
      });
    });
  });

  describe('equalsメソッドで等価比較すること', () => {
    test('同じ値のFamilyNameオブジェクト同士がtrueを返すこと', () => {
      // 準備
      const familyName1 = new FamilyName('田中家');
      const familyName2 = new FamilyName('田中家');

      // 実行
      const result = familyName1.equals(familyName2);

      // 検証
      expect(result).toBe(true);
    });

    test('異なる値のFamilyNameオブジェクト同士がfalseを返すこと', () => {
      // 準備
      const familyName1 = new FamilyName('田中家');
      const familyName2 = new FamilyName('佐藤家');

      // 実行
      const result = familyName1.equals(familyName2);

      // 検証
      expect(result).toBe(false);
    });

    test('FamilyNameオブジェクト以外との比較でfalseを返すこと', () => {
      // 準備
      const familyName = new FamilyName('田中家');
      const other = '田中家';

      // 実行
      const result = familyName.equals(other);

      // 検証
      expect(result).toBe(false);
    });
  });

  describe('toStringメソッドで文字列表現を取得すること', () => {
    test('家族名の値が文字列として返されること', () => {
      // 準備
      const familyNameValue = '田中家';
      const familyName = new FamilyName(familyNameValue);

      // 実行
      const result = familyName.toString();

      // 検証
      expect(result).toBe(familyNameValue);
    });
  });

  describe('toDebugStringメソッドでデバッグ用文字列を取得すること', () => {
    test('有効な家族名のデバッグ文字列が返されること', () => {
      // 準備
      const familyNameValue = '田中家';
      const familyName = new FamilyName(familyNameValue);

      // 実行
      const result = familyName.toDebugString();

      // 検証
      expect(result).toContain('valueName: 家族名');
      expect(result).toContain('value: 田中家');
      expect(result).toContain('errorMessage: null');
    });

    test('無効な家族名のデバッグ文字列が返されること', () => {
      // 準備
      const familyNameValue = '';
      const familyName = new FamilyName(familyNameValue);

      // 実行
      const result = familyName.toDebugString();

      // 検証
      expect(result).toContain('valueName: 家族名');
      expect(result).toContain('value: ');
      expect(result).not.toContain('errorMessage: null');
    });
  });
});
