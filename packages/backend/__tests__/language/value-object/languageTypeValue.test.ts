import { describe, test, expect } from '@jest/globals';
import { LanguageTypeValue, LanguageTypeValueSchema } from '@shared/features/language/value-object/languageTypeValue';
import { LanguageId } from '@shared/features/language/value-object/languageId';
import { LanguageCode } from '@shared/features/language/value-object/languageCode';
import { LanguageName } from '@shared/features/language/value-object/languageName';
import { LanguageEntity } from '@backend/features/language/entity/languageEntity';

describe('LanguageTypeValue', () => {
  describe('コンストラクタでインスタンスを作成すること', () => {
    test('デフォルト値でインスタンスが作成されること', () => {
      // 準備
      const id = new LanguageId(1);
      
      // 実行
      const languageTypeValue = new LanguageTypeValue(id);
      
      // 検証
      expect(languageTypeValue.id).toBe(id);
      expect(languageTypeValue.code.value).toBe('unknown');
      expect(languageTypeValue.name.value).toBe('Unknown');
      expect(languageTypeValue.isActive).toBe(false);
      expect(languageTypeValue.sortOrder).toBe(0);
    });

    test('すべてのパラメータを指定してインスタンスが作成されること', () => {
      // 準備
      const id = new LanguageId(1);
      const code = new LanguageCode('ja');
      const name = new LanguageName('Japanese');
      const isActive = true;
      const sortOrder = 1;
      
      // 実行
      const languageTypeValue = new LanguageTypeValue(id, code, name, isActive, sortOrder);
      
      // 検証
      expect(languageTypeValue.id).toBe(id);
      expect(languageTypeValue.code).toBe(code);
      expect(languageTypeValue.name).toBe(name);
      expect(languageTypeValue.isActive).toBe(isActive);
      expect(languageTypeValue.sortOrder).toBe(sortOrder);
    });
  });

  describe('setFromEntityメソッドでエンティティから値を設定すること', () => {
    test('エンティティの値が正しく設定されること', () => {
      // 準備
      const id = new LanguageId(1);
      const languageTypeValue = new LanguageTypeValue(id);
      const entity = Object.assign(new LanguageEntity(), {
        id: 1,
        code: 'en',
        name: 'English',
        is_active: true,
        sort_order: 2
      });
      
      // 実行
      languageTypeValue.setFromEntity(entity);
      
      // 検証
      expect(languageTypeValue.code.value).toBe('en');
      expect(languageTypeValue.name.value).toBe('English');
      expect(languageTypeValue.isActive).toBe(true);
      expect(languageTypeValue.sortOrder).toBe(2);
    });
  });

  describe('toZodDataメソッドでZodスキーマに準拠したデータを返すこと', () => {
    test('正しいデータ構造が返されること', () => {
      // 準備
      const id = new LanguageId(1);
      const code = new LanguageCode('ja');
      const name = new LanguageName('Japanese');
      const languageTypeValue = new LanguageTypeValue(id, code, name, true, 1);
      
      // 実行
      const zodData = languageTypeValue.toZodData();
      
      // 検証
      expect(zodData.id).toBe(1);
      expect(zodData.code).toBe('ja');
      expect(zodData.name).toBe('Japanese');
      expect(zodData.isActive).toBe(true);
      expect(zodData.sortOrder).toBe(1);
    });

    test('Zodスキーマによる検証が成功すること', () => {
      // 準備
      const id = new LanguageId(1);
      const languageTypeValue = new LanguageTypeValue(id);
      
      // 実行
      const zodData = languageTypeValue.toZodData();
      const validationResult = LanguageTypeValueSchema.safeParse(zodData);
      
      // 検証
      expect(validationResult.success).toBe(true);
    });
  });

  describe('setFromZodDataメソッドでZodデータから値を初期化すること', () => {
    test('正しいデータで値が設定されること', () => {
      // 準備
      const id = new LanguageId(1);
      const languageTypeValue = new LanguageTypeValue(id);
      const zodData = {
        id: 1,
        code: 'en',
        name: 'English',
        isActive: true,
        sortOrder: 2
      };
      
      // 実行
      languageTypeValue.setFromZodData(zodData);
      
      // 検証
      expect(languageTypeValue.code.value).toBe('en');
      expect(languageTypeValue.name.value).toBe('English');
      expect(languageTypeValue.isActive).toBe(true);
      expect(languageTypeValue.sortOrder).toBe(2);
    });

    test('一部のプロパティが未定義でもデフォルト値が設定されること', () => {
      // 準備
      const id = new LanguageId(1);
      const languageTypeValue = new LanguageTypeValue(id);
      const zodData = {
        id: 1
      };
      
      // 実行
      languageTypeValue.setFromZodData(zodData);
      
      // 検証
      expect(languageTypeValue.code.value).toBe('unknown');
      expect(languageTypeValue.name.value).toBe('Unknown');
      expect(languageTypeValue.isActive).toBe(false);
      expect(languageTypeValue.sortOrder).toBe(0);
    });

    test('IDが異なる場合にエラーが発生すること', () => {
      // 準備
      const id = new LanguageId(1);
      const languageTypeValue = new LanguageTypeValue(id);
      const zodData = {
        id: 2,
        code: 'en',
        name: 'English'
      };
      
      // 実行・検証
      expect(() => {
        languageTypeValue.setFromZodData(zodData);
      }).toThrow('ID mismatch: expected 1, got 2');
    });
  });
});
