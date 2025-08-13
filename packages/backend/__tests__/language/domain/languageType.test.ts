import { describe, test, expect } from '@jest/globals';
import { LanguageEntity } from 'src/features/language/entity/languageEntity';
import { LanguageType, LanguageTypeSchema } from 'src/features/language/enum/languageType';
import { LanguageId } from 'src/features/language/value-object/languageId';

describe('LanguageType', () => {
  describe('デフォルト値でEnumが初期化されること', () => {
    test('JAPANESEとENGLISHの値オブジェクトが存在すること', () => {
      // 準備・実行・検証
      expect(LanguageType.JAPANESE).toBeDefined();
      expect(LanguageType.ENGLISH).toBeDefined();
      expect(LanguageType.JAPANESE.id.value).toBe(1);
      expect(LanguageType.ENGLISH.id.value).toBe(2);
    });
  });

  describe('getAllValuesメソッドですべてのEnum値を取得すること', () => {
    test('JAPANESEとENGLISHの配列が返されること', () => {
      // 準備・実行
      const allValues = LanguageType.getAllValues();
      
      // 検証
      expect(allValues).toHaveLength(2);
      expect(allValues).toContain(LanguageType.JAPANESE);
      expect(allValues).toContain(LanguageType.ENGLISH);
    });
  });

  describe('getValueByIdメソッドでIDから値を取得すること', () => {
    test('ID=1でJAPANESEが取得できること', () => {
      // 準備
      const targetId = new LanguageId(1);
      
      // 実行
      const result = LanguageType.getValueById(targetId);
      
      // 検証
      expect(result).toBe(LanguageType.JAPANESE);
    });

    test('ID=2でENGLISHが取得できること', () => {
      // 準備
      const targetId = new LanguageId(2);
      
      // 実行
      const result = LanguageType.getValueById(targetId);
      
      // 検証
      expect(result).toBe(LanguageType.ENGLISH);
    });

    test('存在しないIDでエラーが発生すること', () => {
      // 準備
      const invalidId = new LanguageId(999);
      
      // 実行・検証
      expect(() => {
        LanguageType.getValueById(invalidId);
      }).toThrow('ID 999 is not valid for LanguageTypeEnum');
    });
  });

  describe('updateFromEntitiesメソッドでエンティティから初期化すること', () => {
    test('エンティティリストから値が更新されること', () => {
      // 準備
      const entities = [
        Object.assign(new LanguageEntity(), {
          id: 1,
          code: 'ja',
          name: 'Japanese',
          is_active: true,
          sort_order: 1
        }),
        Object.assign(new LanguageEntity(), {
          id: 2,
          code: 'en',
          name: 'English',
          is_active: true,
          sort_order: 2
        })
      ];
      
      // 実行
      LanguageType.updateFromEntities(entities);
      
      // 検証
      expect(LanguageType.JAPANESE.code.value).toBe('ja');
      expect(LanguageType.JAPANESE.name.value).toBe('Japanese');
      expect(LanguageType.JAPANESE.isActive).toBe(true);
      expect(LanguageType.JAPANESE.sortOrder).toBe(1);
      
      expect(LanguageType.ENGLISH.code.value).toBe('en');
      expect(LanguageType.ENGLISH.name.value).toBe('English');
      expect(LanguageType.ENGLISH.isActive).toBe(true);
      expect(LanguageType.ENGLISH.sortOrder).toBe(2);
    });

    test('一部のエンティティのみ存在する場合でも正しく更新されること', () => {
      // 準備
      const entities = [
        Object.assign(new LanguageEntity(), {
          id: 1,
          code: 'ja',
          name: 'Japanese Updated',
          is_active: false,
          sort_order: 10
        })
      ];
      
      // 実行前の状態を確認（ENGLISHは変更されないはず）
      const englishBefore = {
        code: LanguageType.ENGLISH.code.value,
        name: LanguageType.ENGLISH.name.value,
        isActive: LanguageType.ENGLISH.isActive,
        sortOrder: LanguageType.ENGLISH.sortOrder
      };
      
      LanguageType.updateFromEntities(entities);
      
      // 検証
      expect(LanguageType.JAPANESE.name.value).toBe('Japanese Updated');
      expect(LanguageType.JAPANESE.isActive).toBe(false);
      expect(LanguageType.JAPANESE.sortOrder).toBe(10);
      
      // ENGLISHは変更されていないことを確認
      expect(LanguageType.ENGLISH.code.value).toBe(englishBefore.code);
      expect(LanguageType.ENGLISH.name.value).toBe(englishBefore.name);
    });
  });

  describe('toZodDataメソッドでZodスキーマに準拠したデータを返すこと', () => {
    test('正しいデータ構造が返されること', () => {
      // 準備・実行
      const zodData = LanguageType.toZodData();
      
      // 検証
      expect(zodData).toHaveProperty('japanese');
      expect(zodData).toHaveProperty('english');
      expect(zodData.japanese.id).toBe(1);
      expect(zodData.english.id).toBe(2);
    });

    test('Zodスキーマによる検証が成功すること', () => {
      // 準備・実行
      const zodData = LanguageType.toZodData();
      const validationResult = LanguageTypeSchema.safeParse(zodData);
      
      // 検証
      expect(validationResult.success).toBe(true);
    });
  });

  describe('setFromZodDataメソッドでZodデータから値を初期化すること', () => {
    test('正しいデータで値が設定されること', () => {
      // 準備
      const zodData = {
        japanese: {
          id: 1,
          code: 'ja',
          name: 'Japanese from Zod',
          isActive: true,
          sortOrder: 1
        },
        english: {
          id: 2,
          code: 'en',
          name: 'English from Zod',
          isActive: true,
          sortOrder: 2
        }
      };
      
      // 実行
      LanguageType.setFromZodData(zodData);
      
      // 検証
      expect(LanguageType.JAPANESE.name.value).toBe('Japanese from Zod');
      expect(LanguageType.ENGLISH.name.value).toBe('English from Zod');
    });

    test('一部のデータが未定義でも正しく処理されること', () => {
      // 準備
      const zodData = {
        japanese: {
          id: 1,
          name: 'Only Japanese Updated'
        },
        english: {
          id: 2
        }
      };
      
      // 実行
      LanguageType.setFromZodData(zodData);
      
      // 検証
      expect(LanguageType.JAPANESE.name.value).toBe('Only Japanese Updated');
    });
  });
});
