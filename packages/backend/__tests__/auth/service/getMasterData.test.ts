import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { getMasterData } from '@backend/features/auth/usecase/getMasterData';
import { LanguageType } from '@shared/features/language/enum/languageType';
import { FamilyMemberType } from '@shared/features/family-member/enum/familyMemberType';

// モックの作成
jest.mock('@shared/features/language/enum/languageType');
jest.mock('@shared/features/family-member/enum/familyMemberType');

const MockedLanguageType = LanguageType as jest.Mocked<typeof LanguageType>;
const MockedFamilyMemberType = FamilyMemberType as jest.Mocked<typeof FamilyMemberType>;

describe('getMasterData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('正常系のテストケース', () => {
    test('マスタデータが正常に取得されること', async () => {
      // 準備
      const mockLanguageData = {
        japanese: { id: 1, code: 'ja', name: 'Japanese', isActive: true, sortOrder: 1 },
        english: { id: 2, code: 'en', name: 'English', isActive: true, sortOrder: 2 }
      };
      const mockFamilyMemberData = {
        parent: { id: 1, tableName: 'parent', description: 'Parent Member' },
        child: { id: 2, tableName: 'child', description: 'Child Member' }
      };

      MockedLanguageType.toZodData.mockReturnValue(mockLanguageData);
      MockedFamilyMemberType.toZodData.mockReturnValue(mockFamilyMemberData);

      // 実行
      const result = await getMasterData();

      // 検証
      expect(MockedLanguageType.toZodData).toHaveBeenCalledTimes(1);
      expect(MockedFamilyMemberType.toZodData).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        languages: mockLanguageData,
        familyMemberTypes: mockFamilyMemberData
      });
    });

    test('空のデータでも正常に処理されること', async () => {
      // 準備
      const emptyLanguageData = { 
        japanese: { id: 1, code: 'ja', name: 'Japanese' }, 
        english: { id: 2, code: 'en', name: 'English' } 
      };
      const emptyFamilyMemberData = { 
        parent: { id: 1, tableName: 'parent', description: 'Parent Member' }, 
        child: { id: 2, tableName: 'child', description: 'Child Member' } 
      };

      MockedLanguageType.toZodData.mockReturnValue(emptyLanguageData);
      MockedFamilyMemberType.toZodData.mockReturnValue(emptyFamilyMemberData);

      // 実行
      const result = await getMasterData();

      // 検証
      expect(result).toEqual({
        languages: emptyLanguageData,
        familyMemberTypes: emptyFamilyMemberData
      });
    });
  });

  describe('異常系のテストケース', () => {
    test('LanguageTypeでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      MockedLanguageType.toZodData.mockImplementation(() => {
        throw new Error('言語データ取得エラー');
      });
      MockedFamilyMemberType.toZodData.mockReturnValue({
        parent: { id: 1, tableName: 'parent', description: 'Parent Member' },
        child: { id: 2, tableName: 'child', description: 'Child Member' }
      });

      // 実行・検証
      await expect(getMasterData()).rejects.toThrow('マスタデータ取得中にエラーが発生しました: 言語データ取得エラー');
    });

    test('FamilyMemberTypeでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      MockedLanguageType.toZodData.mockReturnValue({
        japanese: { id: 1, code: 'ja', name: 'Japanese', isActive: true, sortOrder: 1 },
        english: { id: 2, code: 'en', name: 'English', isActive: true, sortOrder: 2 }
      });
      MockedFamilyMemberType.toZodData.mockImplementation(() => {
        throw new Error('家族メンバータイプデータ取得エラー');
      });

      // 実行・検証
      await expect(getMasterData()).rejects.toThrow('マスタデータ取得中にエラーが発生しました: 家族メンバータイプデータ取得エラー');
    });

    test('両方でエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      MockedLanguageType.toZodData.mockImplementation(() => {
        throw new Error('言語データ取得エラー');
      });
      MockedFamilyMemberType.toZodData.mockImplementation(() => {
        throw new Error('家族メンバータイプデータ取得エラー');
      });

      // 実行・検証
      await expect(getMasterData()).rejects.toThrow('マスタデータ取得中にエラーが発生しました:');
    });

    test('予期しないエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      MockedLanguageType.toZodData.mockImplementation(() => {
        throw '文字列エラー';
      });
      MockedFamilyMemberType.toZodData.mockReturnValue({
        parent: { id: 1, tableName: 'parent', description: 'Parent Member' },
        child: { id: 2, tableName: 'child', description: 'Child Member' }
      });

      // 実行・検証
      await expect(getMasterData()).rejects.toThrow('マスタデータ取得中にエラーが発生しました: Unknown error');
    });
  });
});
