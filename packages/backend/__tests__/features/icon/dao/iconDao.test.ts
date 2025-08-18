import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EntityManager, Repository } from 'typeorm';
import { IconDao } from 'src/features/icon/dao/iconDao';
import { IconEntity } from 'src/features/icon/entity/iconEntity';

describe('IconDao', () => {
  let dao: IconDao;
  let mockSession: jest.Mocked<EntityManager>;
  let mockRepository: jest.Mocked<Repository<IconEntity>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
    } as any;

    mockSession = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as any;

    dao = new IconDao(mockSession);
  });

  describe('fetchAll', () => {
    test('全てのアイコンを取得すること', async () => {
      // 準備
      const mockEntities = [
        Object.assign(new IconEntity(), { id: 1, category_id: 1, sort_order: 10, is_active: true }),
        Object.assign(new IconEntity(), { id: 2, category_id: 2, sort_order: 10, is_active: true }),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.fetchAll();

      // 検証
      expect(result).toEqual(mockEntities);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    test('アイコンが存在しない場合は空配列を返すこと', async () => {
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
