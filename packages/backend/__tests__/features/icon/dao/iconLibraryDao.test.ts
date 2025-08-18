import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EntityManager, Repository } from 'typeorm';
import { IconLibraryDao } from 'src/features/icon/dao/iconLibraryDao';
import { IconLibraryEntity } from 'src/features/icon/entity/iconLibraryEntity';

describe('IconLibraryDao', () => {
  let dao: IconLibraryDao;
  let mockSession: jest.Mocked<EntityManager>;
  let mockRepository: jest.Mocked<Repository<IconLibraryEntity>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
    } as any;

    mockSession = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as any;

    dao = new IconLibraryDao(mockSession);
  });

  describe('fetchAll', () => {
    test('全てのアイコンライブラリを取得すること', async () => {
      // 準備
      const mockEntities = [
        Object.assign(new IconLibraryEntity(), { id: 1, name: "Lucide React" }),
        Object.assign(new IconLibraryEntity(), { id: 2, name: "Material Icons" }),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.fetchAll();

      // 検証
      expect(result).toEqual(mockEntities);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    test('アイコンライブラリが存在しない場合は空配列を返すこと', async () => {
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
