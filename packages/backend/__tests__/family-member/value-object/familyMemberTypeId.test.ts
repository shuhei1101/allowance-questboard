import { describe, test, expect } from '@jest/globals';
import { FamilyMemberTypeId } from '@shared/utils/features/family-member/value-object/familyMemberTypeId';

describe('FamilyMemberTypeId', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('有効な値でインスタンスが作成されること', () => {
      // 準備
      const value = 1;
      
      // 実行
      const familyMemberTypeId = new FamilyMemberTypeId(value);
      
      // 検証
      expect(familyMemberTypeId.value).toBe(value);
    });
  });

  describe('equalsメソッドで同値比較ができること', () => {
    test('同じ値のIDが等しいと判定されること', () => {
      // 準備
      const id1 = new FamilyMemberTypeId(1);
      const id2 = new FamilyMemberTypeId(1);
      
      // 実行・検証
      expect(id1.equals(id2)).toBe(true);
    });

    test('異なる値のIDが等しくないと判定されること', () => {
      // 準備
      const id1 = new FamilyMemberTypeId(1);
      const id2 = new FamilyMemberTypeId(2);
      
      // 実行・検証
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toStringメソッドで文字列表現が取得できること', () => {
    test('文字列表現が取得できること', () => {
      // 準備
      const familyMemberTypeId = new FamilyMemberTypeId(1);
      
      // 実行
      const stringValue = familyMemberTypeId.toString();
      
      // 検証
      expect(typeof stringValue).toBe('string');
      expect(stringValue).toContain('1');
    });
  });
});
