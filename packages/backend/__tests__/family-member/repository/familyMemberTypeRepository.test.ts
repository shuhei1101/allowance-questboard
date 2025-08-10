import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { FamilyMemberTypeRepository, FamilyMemberTypeRepositoryParams } from '@backend/features/family-member/repository/familyMemberTypeRepository';
import { FamilyMemberTypeDao } from '@backend/features/family-member/dao/familyMemberTypeDao';
import { FamilyMemberType } from '@shared/features/family-member/enum/familyMemberType';
import { FamilyMemberTypeEntity } from '@backend/features/family-member/entity/familyMemberTypeEntity';

// モックの作成
jest.mock('@backend/features/family-member/dao/familyMemberTypeDao');
jest.mock('@shared/features/family-member/enum/familyMemberType');

describe('FamilyMemberTypeRepository', () => {
  let mockFamilyMemberTypeDao: jest.Mocked<FamilyMemberTypeDao>;
  let familyMemberTypeRepository: FamilyMemberTypeRepository;
  let params: FamilyMemberTypeRepositoryParams;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // モックDAOの設定
    mockFamilyMemberTypeDao = {
      fetchAll: jest.fn()
    } as unknown as jest.Mocked<FamilyMemberTypeDao>;
    
    // パラメータの設定
    params = {
      familyMemberTypeDao: mockFamilyMemberTypeDao
    };
    
    // リポジトリのインスタンス作成
    familyMemberTypeRepository = new FamilyMemberTypeRepository(params);
  });

  describe('updateFamilyMemberTypeEnumメソッド', () => {
    test('家族メンバーEnumの更新が正常に完了すること', async () => {
      // 準備
      const mockEntity1 = new FamilyMemberTypeEntity();
      mockEntity1.id = 1;
      mockEntity1.table_name = 'parents';
      mockEntity1.description = '親';
      
      const mockEntity2 = new FamilyMemberTypeEntity();
      mockEntity2.id = 2;
      mockEntity2.table_name = 'children';
      mockEntity2.description = '子供';
      
      const mockEntities = [mockEntity1, mockEntity2];
      
      mockFamilyMemberTypeDao.fetchAll.mockResolvedValue(mockEntities);
      
      const mockUpdateFromEntities = jest.spyOn(FamilyMemberType, 'updateFromEntities')
        .mockImplementation(() => {});

      // 実行
      await familyMemberTypeRepository.updateFamilyMemberTypeEnum();

      // 検証
      expect(mockFamilyMemberTypeDao.fetchAll).toHaveBeenCalledTimes(1);
      expect(mockUpdateFromEntities).toHaveBeenCalledWith(mockEntities);
    });

    test('DAOでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const errorMessage = 'DAO Error';
      mockFamilyMemberTypeDao.fetchAll.mockRejectedValue(new Error(errorMessage));

      // 実行・検証
      await expect(familyMemberTypeRepository.updateFamilyMemberTypeEnum()).rejects.toThrow(
        `家族メンバーEnum更新中にエラーが発生しました: ${errorMessage}`
      );
      expect(mockFamilyMemberTypeDao.fetchAll).toHaveBeenCalledTimes(1);
    });

    test('FamilyMemberType.updateFromEntitiesでエラーが発生した場合にエラーが投げられること', async () => {
      // 準備
      const mockEntity = new FamilyMemberTypeEntity();
      mockEntity.id = 1;
      mockEntity.table_name = 'parents';
      mockEntity.description = '親';
      
      const mockEntities = [mockEntity];
      
      mockFamilyMemberTypeDao.fetchAll.mockResolvedValue(mockEntities);
      
      const errorMessage = 'Enum Update Error';
      const mockUpdateFromEntities = jest.spyOn(FamilyMemberType, 'updateFromEntities')
        .mockImplementation(() => {
          throw new Error(errorMessage);
        });

      // 実行・検証
      await expect(familyMemberTypeRepository.updateFamilyMemberTypeEnum()).rejects.toThrow(
        `家族メンバーEnum更新中にエラーが発生しました: ${errorMessage}`
      );
      expect(mockFamilyMemberTypeDao.fetchAll).toHaveBeenCalledTimes(1);
      expect(mockUpdateFromEntities).toHaveBeenCalledWith(mockEntities);
    });

    test('予期しないエラーが発生した場合にUnknown errorが投げられること', async () => {
      // 準備
      mockFamilyMemberTypeDao.fetchAll.mockRejectedValue('文字列エラー');

      // 実行・検証
      await expect(familyMemberTypeRepository.updateFamilyMemberTypeEnum()).rejects.toThrow(
        '家族メンバーEnum更新中にエラーが発生しました: Unknown error'
      );
      expect(mockFamilyMemberTypeDao.fetchAll).toHaveBeenCalledTimes(1);
    });
  });
});
