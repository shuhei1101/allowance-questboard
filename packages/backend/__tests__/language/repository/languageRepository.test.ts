import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { LanguageRepository, LanguageRepositoryParams } from '@backend/features/language/repository/languageRepository';
import { LanguageDao } from '@backend/features/language/dao/languageDao';
import { LanguageType } from '@shared/features/language/enum/languageType';
import { LanguageEntity } from '@backend/features/language/entity/languageEntity';

// モックの作成
jest.mock('@backend/features/language/dao/languageDao');
jest.mock('@shared/features/language/enum/languageType');

describe('LanguageRepository', () => {
  let mockLanguageDao: jest.Mocked<LanguageDao>;
  let languageRepository: LanguageRepository;
  let params: LanguageRepositoryParams;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // モックDAOの設定
    mockLanguageDao = {
      fetchAll: jest.fn()
    } as unknown as jest.Mocked<LanguageDao>;
    
    // パラメータの設定
    params = {
      languageDao: mockLanguageDao
    };
    
    // リポジトリのインスタンス作成
    languageRepository = new LanguageRepository(params);
  });

  describe('updateLanguageEnumメソッド', () => {
    test('言語Enumの更新が正常に完了すること', async () => {
      // 準備
      const mockEntity1 = new LanguageEntity();
      mockEntity1.id = 1;
      mockEntity1.code = 'ja';
      mockEntity1.name = 'Japanese';
      
      const mockEntity2 = new LanguageEntity();
      mockEntity2.id = 2;
      mockEntity2.code = 'en';
      mockEntity2.name = 'English';
      
      const mockEntities = [mockEntity1, mockEntity2];
      
      mockLanguageDao.fetchAll.mockResolvedValue(mockEntities);
      
      const mockUpdateFromEntities = jest.spyOn(LanguageType, 'updateFromEntities')
        .mockImplementation(() => {});

      // 実行
      await languageRepository.updateLanguageEnum();

      // 検証
      expect(mockLanguageDao.fetchAll).toHaveBeenCalledTimes(1);
      expect(mockUpdateFromEntities).toHaveBeenCalledWith(mockEntities);
    });

    test('DAOでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const errorMessage = 'DAO Error';
      mockLanguageDao.fetchAll.mockRejectedValue(new Error(errorMessage));

      // 実行・検証
      await expect(languageRepository.updateLanguageEnum()).rejects.toThrow(
        `言語Enum更新中にエラーが発生しました: ${errorMessage}`
      );
      expect(mockLanguageDao.fetchAll).toHaveBeenCalledTimes(1);
    });

    test('LanguageType.updateFromEntitiesでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const mockEntity = new LanguageEntity();
      mockEntity.id = 1;
      mockEntity.code = 'ja';
      mockEntity.name = 'Japanese';
      
      const mockEntities = [mockEntity];
      
      mockLanguageDao.fetchAll.mockResolvedValue(mockEntities);
      
      const errorMessage = 'Enum Update Error';
      const mockUpdateFromEntities = jest.spyOn(LanguageType, 'updateFromEntities')
        .mockImplementation(() => {
          throw new Error(errorMessage);
        });

      // 実行・検証
      await expect(languageRepository.updateLanguageEnum()).rejects.toThrow(
        `言語Enum更新中にエラーが発生しました: ${errorMessage}`
      );
      expect(mockLanguageDao.fetchAll).toHaveBeenCalledTimes(1);
      expect(mockUpdateFromEntities).toHaveBeenCalledWith(mockEntities);
    });

    test('予期しないエラーが発生した場合にUnknown errorが投げられること', async () => {
      // 準備
      mockLanguageDao.fetchAll.mockRejectedValue('文字列エラー');

      // 実行・検証
      await expect(languageRepository.updateLanguageEnum()).rejects.toThrow(
        '言語Enum更新中にエラーが発生しました: Unknown error'
      );
      expect(mockLanguageDao.fetchAll).toHaveBeenCalledTimes(1);
    });
  });
});
