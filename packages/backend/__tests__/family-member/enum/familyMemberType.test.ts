import { describe, test, expect } from '@jest/globals';
import { FamilyMemberTypeEntity } from 'src/features/family-member/entity/familyMemberTypeEntity';
import { FamilyMemberType, FamilyMemberTypeSchema } from 'src/features/family-member/enum/familyMemberType';
import { FamilyMemberTypeId } from 'src/features/family-member/value-object/familyMemberTypeId';

describe('FamilyMemberType', () => {
  describe('定数値が正しく定義されていること', () => {
    test('PARENT定数が正しく定義されていること', () => {
      // 検証
      expect(FamilyMemberType.PARENT.id.value).toBe(1);
    });

    test('CHILD定数が正しく定義されていること', () => {
      // 検証
      expect(FamilyMemberType.CHILD.id.value).toBe(2);
    });
  });

  describe('getAllValuesメソッドですべての値が取得できること', () => {
    test('すべてのEnum値が返されること', () => {
      // 実行
      const allValues = FamilyMemberType.getAllValues();
      
      // 検証
      expect(allValues).toHaveLength(2);
      expect(allValues).toContain(FamilyMemberType.PARENT);
      expect(allValues).toContain(FamilyMemberType.CHILD);
    });
  });

  describe('getValueByIdメソッドでIDから値を取得できること', () => {
    test('有効なIDで値が取得できること', () => {
      // 準備
      const parentId = new FamilyMemberTypeId(1);
      const childId = new FamilyMemberTypeId(2);
      
      // 実行・検証
      expect(FamilyMemberType.getValueById(parentId)).toBe(FamilyMemberType.PARENT);
      expect(FamilyMemberType.getValueById(childId)).toBe(FamilyMemberType.CHILD);
    });

    test('無効なIDでエラーが発生すること', () => {
      // 準備
      const invalidId = new FamilyMemberTypeId(999);
      
      // 実行・検証
      expect(() => {
        FamilyMemberType.getValueById(invalidId);
      }).toThrow('ID 999 is not valid for FamilyMemberTypeEnum');
    });
  });

  describe('toZodDataメソッドでZodスキーマに準拠したデータを返すこと', () => {
    test('正しいデータ構造が返されること', () => {
      // 実行
      const zodData = FamilyMemberType.toZodData();
      
      // 検証
      expect(zodData).toHaveProperty('parent');
      expect(zodData).toHaveProperty('child');
      expect(zodData.parent.id).toBe(1);
      expect(zodData.child.id).toBe(2);
    });

    test('Zodスキーマによる検証が成功すること', () => {
      // 実行
      const zodData = FamilyMemberType.toZodData();
      const validationResult = FamilyMemberTypeSchema.safeParse(zodData);
      
      // 検証
      expect(validationResult.success).toBe(true);
    });
  });

  describe('setFromZodDataメソッドでZodデータから値を初期化すること', () => {
    test('正しいデータで値が設定されること', () => {
      // 準備
      const zodData = {
        parent: {
          id: 1,
          tableName: 'parents',
          description: '親'
        },
        child: {
          id: 2,
          tableName: 'children',
          description: '子供'
        }
      };
      
      // 実行
      FamilyMemberType.setFromZodData(zodData);
      
      // 検証
      expect(FamilyMemberType.PARENT.tableName).toBe('parents');
      expect(FamilyMemberType.PARENT.description).toBe('親');
      expect(FamilyMemberType.CHILD.tableName).toBe('children');
      expect(FamilyMemberType.CHILD.description).toBe('子供');
    });
  });

  describe('updateFromEntitiesメソッドでエンティティから値を更新すること', () => {
    test('エンティティリストから値が正しく更新されること', () => {
      // 準備
      const entities: FamilyMemberTypeEntity[] = [
        Object.assign(new FamilyMemberTypeEntity(), {
          id: 1,
          table_name: 'parents',
          description: '親'
        }),
        Object.assign(new FamilyMemberTypeEntity(), {
          id: 2,
          table_name: 'children',
          description: '子供'
        })
      ];
      
      // 実行
      FamilyMemberType.updateFromEntities(entities);
      
      // 検証
      expect(FamilyMemberType.PARENT.tableName).toBe('parents');
      expect(FamilyMemberType.PARENT.description).toBe('親');
      expect(FamilyMemberType.CHILD.tableName).toBe('children');
      expect(FamilyMemberType.CHILD.description).toBe('子供');
    });
  });
});
