import { describe, test, expect } from '@jest/globals';
import { FamilyMemberTypeEntity } from 'src/features/family-member/entity/familyMemberTypeEntity';
import { FamilyMemberTypeId } from 'src/features/family-member/value-object/familyMemberTypeId';
import { FamilyMemberTypeValue, FamilyMemberTypeValueSchema } from 'src/features/family-member/value-object/familyMemberTypeValue';

describe('FamilyMemberTypeValue', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('デフォルト値でインスタンスが作成されること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      
      // 実行
      const familyMemberTypeValue = new FamilyMemberTypeValue(id);
      
      // 検証
      expect(familyMemberTypeValue.id).toBe(id);
      expect(familyMemberTypeValue.tableName).toBe('unknown');
      expect(familyMemberTypeValue.description).toBe('Unknown');
    });

    test('すべてのパラメータを指定してインスタンスが作成されること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const tableName = 'parents';
      const description = '親';
      
      // 実行
      const familyMemberTypeValue = new FamilyMemberTypeValue(id, tableName, description);
      
      // 検証
      expect(familyMemberTypeValue.id).toBe(id);
      expect(familyMemberTypeValue.tableName).toBe(tableName);
      expect(familyMemberTypeValue.description).toBe(description);
    });
  });

  describe('setFromEntityメソッドでエンティティから値を設定すること', () => {
    test('エンティティの値が正しく設定されること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const familyMemberTypeValue = new FamilyMemberTypeValue(id);
      const entity = Object.assign(new FamilyMemberTypeEntity(), {
        id: 1,
        table_name: 'children',
        description: '子供'
      });
      
      // 実行
      familyMemberTypeValue.setFromEntity(entity);
      
      // 検証
      expect(familyMemberTypeValue.tableName).toBe('children');
      expect(familyMemberTypeValue.description).toBe('子供');
    });
  });

  describe('toZodDataメソッドでZodスキーマに準拠したデータを返すこと', () => {
    test('正しいデータ構造が返されること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const tableName = 'parents';
      const description = '親';
      const familyMemberTypeValue = new FamilyMemberTypeValue(id, tableName, description);
      
      // 実行
      const zodData = familyMemberTypeValue.toZodData();
      
      // 検証
      expect(zodData.id).toBe(1);
      expect(zodData.tableName).toBe('parents');
      expect(zodData.description).toBe('親');
    });

    test('Zodスキーマによる検証が成功すること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const familyMemberTypeValue = new FamilyMemberTypeValue(id);
      
      // 実行
      const zodData = familyMemberTypeValue.toZodData();
      const validationResult = FamilyMemberTypeValueSchema.safeParse(zodData);
      
      // 検証
      expect(validationResult.success).toBe(true);
    });
  });

  describe('setFromZodDataメソッドでZodデータから値を初期化すること', () => {
    test('正しいデータで値が設定されること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const familyMemberTypeValue = new FamilyMemberTypeValue(id);
      const zodData = {
        id: 1,
        tableName: 'children',
        description: '子供'
      };
      
      // 実行
      familyMemberTypeValue.setFromZodData(zodData);
      
      // 検証
      expect(familyMemberTypeValue.tableName).toBe('children');
      expect(familyMemberTypeValue.description).toBe('子供');
    });

    test('一部のプロパティが未定義でもデフォルト値が設定されること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const familyMemberTypeValue = new FamilyMemberTypeValue(id);
      const zodData = {
        id: 1
      };
      
      // 実行
      familyMemberTypeValue.setFromZodData(zodData);
      
      // 検証
      expect(familyMemberTypeValue.tableName).toBe('unknown');
      expect(familyMemberTypeValue.description).toBe('Unknown');
    });

    test('IDが異なる場合にエラーが発生すること', () => {
      // 準備
      const id = new FamilyMemberTypeId(1);
      const familyMemberTypeValue = new FamilyMemberTypeValue(id);
      const zodData = {
        id: 2,
        tableName: 'parents',
        description: '親'
      };
      
      // 実行・検証
      expect(() => {
        familyMemberTypeValue.setFromZodData(zodData);
      }).toThrow('ID mismatch: expected 1, got 2');
    });
  });
});
