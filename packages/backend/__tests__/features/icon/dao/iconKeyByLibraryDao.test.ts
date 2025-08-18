import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EntityManager, Repository } from 'typeorm';
import { IconKeyByLibraryDao } from 'src/features/icon/dao/iconKeyByLibraryDao';
import { IconKeyByLibraryEntity } from 'src/features/icon/entity/iconKeyByLibraryEntity';

describe('IconKeyByLibraryDao', () => {
  let dao: IconKeyByLibraryDao;
  let mockSession: jest.Mocked<EntityManager>;
  let mockRepository: jest.Mocked<Repository<IconKeyByLibraryEntity>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
    } as any;

    mockSession = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as any;

    dao = new IconKeyByLibraryDao(mockSession);
  });

  describe('fetchAll', () => {
    test('全てのライブラリ別アイコンキーを取得すること', async () => {
      // 準備
      const mockEntities = [
        Object.assign(new IconKeyByLibraryEntity(), { 
          id: 1, 
          icon_id: 1, 
          library_id: 1, 
          name: "Camera", 
          description: "カメラアイコン" 
        }),
        Object.assign(new IconKeyByLibraryEntity(), { 
          id: 2, 
          icon_id: 2, 
          library_id: 1, 
          name: "Heart", 
          description: "ハートアイコン" 
        }),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.fetchAll();

      // 検証
      expect(result).toEqual(mockEntities);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    test('ライブラリ別アイコンキーが存在しない場合は空配列を返すこと', async () => {
      // 準備
      mockRepository.find.mockResolvedValue([]);

      // 実行
      const result = await dao.fetchAll();

      // 検証
      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
});
