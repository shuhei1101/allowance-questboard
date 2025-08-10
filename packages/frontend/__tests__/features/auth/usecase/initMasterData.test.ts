import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { initMasterData } from '@frontend/features/auth/usecase/initMasterData';
import { trpc } from '@frontend/core/api/trpcClient';
import { LanguageType, LanguageTypeSchema } from '@shared/features/language/enum/languageType';
import { FamilyMemberType, FamilyMemberTypeSchema } from '@shared/features/family-member/enum/familyMemberType';
import { z } from 'zod';

// tRPCクライアントをモック化
jest.mock('@frontend/core/api/trpcClient', () => ({
  trpc: {
    init: {
      getMasterData: {
        query: jest.fn()
      }
    }
  }
}));

// EnumのsetFromZodDataメソッドをモック化  
jest.mock('@shared/features/language/enum/languageType', () => ({
  LanguageType: {
    setFromZodData: jest.fn()
  }
}));

jest.mock('@shared/features/family-member/enum/familyMemberType', () => ({
  FamilyMemberType: {
    setFromZodData: jest.fn()
  }
}));

const mockedTrpc = jest.mocked(trpc);
const mockedLanguageType = jest.mocked(LanguageType);
const mockedFamilyMemberType = jest.mocked(FamilyMemberType);

describe('initMasterData', () => {
  let consoleSpy: jest.SpiedFunction<typeof console.log>;
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // コンソールログのスパイを設定
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('正常系のテストケース', () => {
    test('マスタデータの初期化が正常に完了すること', async () => {
      // 準備
      const mockLanguageData = {
        japanese: { id: 1, name: '日本語' },
        english: { id: 2, name: 'English' }
      };
      const mockFamilyMemberData = {
        parent: { id: 1, name: '親' },
        child: { id: 2, name: '子' }
      };
      
      const mockMasterData = {
        language: mockLanguageData,
        familyMemberType: mockFamilyMemberData
      };

      mockedTrpc.init.getMasterData.query.mockResolvedValue(mockMasterData);

      // 実行
      await initMasterData();

      // 検証
      expect(mockedTrpc.init.getMasterData.query).toHaveBeenCalledTimes(1);
      expect(mockedLanguageType.setFromZodData).toHaveBeenCalledWith(mockLanguageData);
      expect(mockedFamilyMemberType.setFromZodData).toHaveBeenCalledWith(mockFamilyMemberData);
      
      expect(consoleSpy).toHaveBeenCalledWith('✨ LanguageType Enum更新完了！');
      expect(consoleSpy).toHaveBeenCalledWith('✨ FamilyMemberType Enum更新完了！');
      expect(consoleSpy).toHaveBeenCalledWith('🌟 マスタデータ初期化完了！');
    });

    test('言語データのみが存在する場合に正常に処理されること', async () => {
      // 準備
      const mockLanguageData = {
        japanese: { id: 1, name: '日本語' },
        english: { id: 2, name: 'English' }
      };
      
      const mockMasterData = {
        language: mockLanguageData,
        familyMemberType: null
      };

      mockedTrpc.init.getMasterData.query.mockResolvedValue(mockMasterData);

      // 実行
      await initMasterData();

      // 検証
      expect(mockedTrpc.init.getMasterData.query).toHaveBeenCalledTimes(1);
      expect(mockedLanguageType.setFromZodData).toHaveBeenCalledWith(mockLanguageData);
      expect(mockedFamilyMemberType.setFromZodData).not.toHaveBeenCalled();
      
      expect(consoleSpy).toHaveBeenCalledWith('✨ LanguageType Enum更新完了！');
      expect(consoleSpy).not.toHaveBeenCalledWith('✨ FamilyMemberType Enum更新完了！');
      expect(consoleSpy).toHaveBeenCalledWith('🌟 マスタデータ初期化完了！');
    });

    test('家族メンバータイプデータのみが存在する場合に正常に処理されること', async () => {
      // 準備
      const mockFamilyMemberData = {
        parent: { id: 1, name: '親' },
        child: { id: 2, name: '子' }
      };
      
      const mockMasterData = {
        language: null,
        familyMemberType: mockFamilyMemberData
      };

      mockedTrpc.init.getMasterData.query.mockResolvedValue(mockMasterData);

      // 実行
      await initMasterData();

      // 検証
      expect(mockedTrpc.init.getMasterData.query).toHaveBeenCalledTimes(1);
      expect(mockedLanguageType.setFromZodData).not.toHaveBeenCalled();
      expect(mockedFamilyMemberType.setFromZodData).toHaveBeenCalledWith(mockFamilyMemberData);
      
      expect(consoleSpy).not.toHaveBeenCalledWith('✨ LanguageType Enum更新完了！');
      expect(consoleSpy).toHaveBeenCalledWith('✨ FamilyMemberType Enum更新完了！');
      expect(consoleSpy).toHaveBeenCalledWith('🌟 マスタデータ初期化完了！');
    });

    test('マスタデータが空の場合でも正常に処理されること', async () => {
      // 準備
      const mockMasterData = {
        language: null,
        familyMemberType: null
      };

      mockedTrpc.init.getMasterData.query.mockResolvedValue(mockMasterData);

      // 実行
      await initMasterData();

      // 検証
      expect(mockedTrpc.init.getMasterData.query).toHaveBeenCalledTimes(1);
      expect(mockedLanguageType.setFromZodData).not.toHaveBeenCalled();
      expect(mockedFamilyMemberType.setFromZodData).not.toHaveBeenCalled();
      
      expect(consoleSpy).not.toHaveBeenCalledWith('✨ LanguageType Enum更新完了！');
      expect(consoleSpy).not.toHaveBeenCalledWith('✨ FamilyMemberType Enum更新完了！');
      expect(consoleSpy).toHaveBeenCalledWith('🌟 マスタデータ初期化完了！');
    });
  });

  describe('異常系のテストケース', () => {
    test('tRPC通信でエラーが発生した場合に適切に例外処理されること', async () => {
      // 準備
      const mockError = new Error('API通信エラー');
      mockedTrpc.init.getMasterData.query.mockRejectedValue(mockError);

      // 実行 & 検証
      await expect(initMasterData()).rejects.toThrow('マスタデータの初期化に失敗しました: API通信エラー');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ マスタデータ初期化エラー:', mockError);
      expect(mockedLanguageType.setFromZodData).not.toHaveBeenCalled();
      expect(mockedFamilyMemberType.setFromZodData).not.toHaveBeenCalled();
    });

    test('LanguageTypeのsetFromZodDataでエラーが発生した場合に適切に例外処理されること', async () => {
      // 準備
      const mockLanguageData = {
        japanese: { id: 1, name: '日本語' },
        english: { id: 2, name: 'English' }
      };
      
      const mockMasterData = {
        language: mockLanguageData,
        familyMemberType: null
      };

      const mockError = new Error('LanguageType更新エラー');
      mockedTrpc.init.getMasterData.query.mockResolvedValue(mockMasterData);
      mockedLanguageType.setFromZodData.mockImplementation(() => {
        throw mockError;
      });

      // 実行 & 検証
      await expect(initMasterData()).rejects.toThrow('マスタデータの初期化に失敗しました: LanguageType更新エラー');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ マスタデータ初期化エラー:', mockError);
      expect(mockedLanguageType.setFromZodData).toHaveBeenCalledWith(mockLanguageData);
      expect(mockedFamilyMemberType.setFromZodData).not.toHaveBeenCalled();
    });

    test('FamilyMemberTypeのsetFromZodDataでエラーが発生した場合に適切に例外処理されること', async () => {
      // 準備
      const mockFamilyMemberData = {
        parent: { id: 1, name: '親' },
        child: { id: 2, name: '子' }
      };
      
      const mockMasterData = {
        language: null,
        familyMemberType: mockFamilyMemberData
      };

      const mockError = new Error('FamilyMemberType更新エラー');
      mockedTrpc.init.getMasterData.query.mockResolvedValue(mockMasterData);
      mockedFamilyMemberType.setFromZodData.mockImplementation(() => {
        throw mockError;
      });

      // 実行 & 検証
      await expect(initMasterData()).rejects.toThrow('マスタデータの初期化に失敗しました: FamilyMemberType更新エラー');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ マスタデータ初期化エラー:', mockError);
      expect(mockedLanguageType.setFromZodData).not.toHaveBeenCalled();
      expect(mockedFamilyMemberType.setFromZodData).toHaveBeenCalledWith(mockFamilyMemberData);
    });

    test('不明なエラーが発生した場合に適切に例外処理されること', async () => {
      // 準備
      const mockError = 'Unknown string error';
      mockedTrpc.init.getMasterData.query.mockRejectedValue(mockError);

      // 実行 & 検証
      await expect(initMasterData()).rejects.toThrow('マスタデータの初期化に失敗しました: Unknown error');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ マスタデータ初期化エラー:', mockError);
      expect(mockedLanguageType.setFromZodData).not.toHaveBeenCalled();
      expect(mockedFamilyMemberType.setFromZodData).not.toHaveBeenCalled();
    });
  });
});
