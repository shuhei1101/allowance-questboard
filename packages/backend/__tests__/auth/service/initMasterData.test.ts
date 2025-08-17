import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { initMasterData, InitMasterDataParams } from 'src/features/auth/usecase/initMasterData';
import { LanguageRepository } from 'src/features/language/repository/languageRepository';
import { FamilyMemberTypeRepository } from 'src/features/family-member/repository/familyMemberTypeRepository';

// モックの作成
jest.mock('src/features/language/repository/languageRepository');
jest.mock('src/features/family-member/repository/familyMemberTypeRepository');

const MockedLanguageRepository = LanguageRepository as jest.MockedClass<typeof LanguageRepository>;
const MockedFamilyMemberTypeRepository = FamilyMemberTypeRepository as jest.MockedClass<typeof FamilyMemberTypeRepository>;

describe('initMasterData', () => {
  let mockLanguageDao: any;
  let mockFamilyMemberTypeDao: any;
  let params: InitMasterDataParams;
  
  // コンソールのスパイを設定
  let consoleSpy: jest.SpiedFunction<typeof console.log>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // モックDAOの設定
    mockLanguageDao = {};
    mockFamilyMemberTypeDao = {};
    
    // パラメータの設定
    params = {
      languageRepository: new MockedLanguageRepository(mockLanguageDao),
      familyMemberTypeRepository: new MockedFamilyMemberTypeRepository(mockFamilyMemberTypeDao)
    };

    // コンソールログのスパイを設定
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('正常系のテストケース', () => {
    test('マスタデータの初期化が正常に完了すること', async () => {
      // 準備
      const mockUpdateLanguageEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      const mockUpdateFamilyMemberTypeEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      
      MockedLanguageRepository.mockImplementation(() => ({
        updateLanguageEnum: mockUpdateLanguageEnum
      }) as any);
      
      MockedFamilyMemberTypeRepository.mockImplementation(() => ({
        updateFamilyMemberTypeEnum: mockUpdateFamilyMemberTypeEnum
      }) as any);

      // 実行
      await initMasterData(params);

      // 検証
      expect(MockedLanguageRepository).toHaveBeenCalledWith(params.languageRepository);
      expect(MockedFamilyMemberTypeRepository).toHaveBeenCalledWith(params.familyMemberTypeRepository);
      expect(mockUpdateLanguageEnum).toHaveBeenCalledTimes(1);
      expect(mockUpdateFamilyMemberTypeEnum).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('マスタデータの初期化が完了しました');
    });

    test('言語EnumとファミリーメンバーEnumの更新が並行実行されること', async () => {
      // 準備
      const mockUpdateLanguageEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      const mockUpdateFamilyMemberTypeEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      
      MockedLanguageRepository.mockImplementation(() => ({
        updateLanguageEnum: mockUpdateLanguageEnum
      }) as any);
      
      MockedFamilyMemberTypeRepository.mockImplementation(() => ({
        updateFamilyMemberTypeEnum: mockUpdateFamilyMemberTypeEnum
      }) as any);

      // Promise.allのスパイを作成
      const promiseAllSpy = jest.spyOn(Promise, 'all');

      // 実行
      await initMasterData(params);

      // 検証
      expect(promiseAllSpy).toHaveBeenCalledWith([
        expect.any(Promise),
        expect.any(Promise)
      ]);
      
      promiseAllSpy.mockRestore();
    });
  });

  describe('異常系のテストケース', () => {
    test('LanguageRepositoryでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const mockUpdateLanguageEnum = jest.fn<() => Promise<void>>().mockRejectedValue(new Error('テストエラー'));
      const mockUpdateFamilyMemberTypeEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      
      MockedLanguageRepository.mockImplementation(() => ({
        updateLanguageEnum: mockUpdateLanguageEnum
      }) as any);
      
      MockedFamilyMemberTypeRepository.mockImplementation(() => ({
        updateFamilyMemberTypeEnum: mockUpdateFamilyMemberTypeEnum
      }) as any);

      // 実行・検証
      await expect(initMasterData(params)).rejects.toThrow('マスタデータ初期化中にエラーが発生しました:');
    });

    test('FamilyMemberTypeRepositoryでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const mockUpdateLanguageEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      const mockUpdateFamilyMemberTypeEnum = jest.fn<() => Promise<void>>().mockRejectedValue(new Error('テストエラー'));
      
      MockedLanguageRepository.mockImplementation(() => ({
        updateLanguageEnum: mockUpdateLanguageEnum
      }) as any);
      
      MockedFamilyMemberTypeRepository.mockImplementation(() => ({
        updateFamilyMemberTypeEnum: mockUpdateFamilyMemberTypeEnum
      }) as any);

      // 実行・検証
      await expect(initMasterData(params)).rejects.toThrow('マスタデータ初期化中にエラーが発生しました:');
    });

    test('両方のRepositoryでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const mockUpdateLanguageEnum = jest.fn<() => Promise<void>>().mockRejectedValue(new Error('言語エラー'));
      const mockUpdateFamilyMemberTypeEnum = jest.fn<() => Promise<void>>().mockRejectedValue(new Error('ファミリーメンバーエラー'));
      
      MockedLanguageRepository.mockImplementation(() => ({
        updateLanguageEnum: mockUpdateLanguageEnum
      }) as any);
      
      MockedFamilyMemberTypeRepository.mockImplementation(() => ({
        updateFamilyMemberTypeEnum: mockUpdateFamilyMemberTypeEnum
      }) as any);

      // 実行・検証
      await expect(initMasterData(params)).rejects.toThrow('マスタデータ初期化中にエラーが発生しました:');
    });

    test('予期しないエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const mockUpdateLanguageEnum = jest.fn<() => Promise<void>>().mockRejectedValue('文字列エラー');
      const mockUpdateFamilyMemberTypeEnum = jest.fn<() => Promise<void>>().mockResolvedValue();
      
      MockedLanguageRepository.mockImplementation(() => ({
        updateLanguageEnum: mockUpdateLanguageEnum
      }) as any);
      
      MockedFamilyMemberTypeRepository.mockImplementation(() => ({
        updateFamilyMemberTypeEnum: mockUpdateFamilyMemberTypeEnum
      }) as any);

      // 実行・検証
      await expect(initMasterData(params)).rejects.toThrow('マスタデータ初期化中にエラーが発生しました: Unknown error');
    });
  });
});
