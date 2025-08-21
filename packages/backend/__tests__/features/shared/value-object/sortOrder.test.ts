import { describe, test, expect } from '@jest/globals';
import { SortOrder } from 'src/features/shared/value-object/sortOrder';
import { ValueValidateError } from '@backend/core/validator/validationError';

describe('SortOrder', () => {
  describe('正常系のテストケース', () => {
    test('有効な表示順序で値オブジェクトを作成できること', () => {
      // 準備・実行
      const sortOrder = new SortOrder(10);

      // 検証
      expect(sortOrder.value).toBe(10);
    });

    test('0の表示順序で値オブジェクトを作成できること', () => {
      // 準備・実行
      const sortOrder = new SortOrder(0);

      // 検証
      expect(sortOrder.value).toBe(0);
    });

    test('Zodスキーマから値オブジェクトを作成できること', () => {
      // 準備
      const data = { value: 5 };

      // 実行
      const sortOrder = SortOrder.fromZodData(data);

      // 検証
      expect(sortOrder.value).toBe(5);
    });
  });

  describe('異常系のテストケース', () => {
    test('負の値の表示順序で無効な値オブジェクトが作成されること', () => {
      // 実行
      const sortOrder = new SortOrder(-1);

      // 検証
      expect(sortOrder.isValid).toBe(false);
      expect(sortOrder.errorMessage).not.toBeNull();
    });

    test('負の値のZodデータで無効な値オブジェクトが作成されること', () => {
      // 準備
      const data = { value: -5 };

      // 実行
      const sortOrder = SortOrder.fromZodData(data);

      // 検証
      expect(sortOrder.isValid).toBe(false);
      expect(sortOrder.errorMessage).not.toBeNull();
    });
  });

  describe('比較のテストケース', () => {
    test('同じ値のSortOrderは等価であること', () => {
      // 準備
      const sortOrder1 = new SortOrder(10);
      const sortOrder2 = new SortOrder(10);

      // 検証
      expect(sortOrder1.equals(sortOrder2)).toBe(true);
    });

    test('異なる値のSortOrderは非等価であること', () => {
      // 準備
      const sortOrder1 = new SortOrder(10);
      const sortOrder2 = new SortOrder(20);

      // 検証
      expect(sortOrder1.equals(sortOrder2)).toBe(false);
    });
  });
});
