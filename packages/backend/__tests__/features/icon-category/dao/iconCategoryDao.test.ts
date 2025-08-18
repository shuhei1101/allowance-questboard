import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EntityManager, Repository } from 'typeorm';
import { IconCategoryDao } from 'src/features/icon-category/dao/iconCategoryDao';
import { IconCategoryEntity } from 'src/features/icon-category/entity/iconCategoryEntity';

describe('IconCategoryDao', () => {
  let dao: IconCategoryDao;
  let mockSession: jest.Mocked<EntityManager>;
  let mockRepository: jest.Mocked<Repository<IconCategoryEntity>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as any;

    mockSession = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as any;

    dao = new IconCategoryDao(mockSession);
  });

  describe('fetchAll', () => {
    test('全てのアイコンカテゴリを取得すること', async () => {
      // 準備
      const mockEntities = [
        Object.assign(new IconCategoryEntity(), { id: 1, sort_order: 1, is_active: true }),
        Object.assign(new IconCategoryEntity(), { id: 2, sort_order: 2, is_active: true }),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.fetchAll();

      // 検証
      expect(result).toEqual(mockEntities);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('fetchById', () => {
    test('指定されたIDのアイコンカテゴリを取得すること', async () => {
      // 準備
      const mockEntity = Object.assign(new IconCategoryEntity(), { id: 1, sort_order: 1, is_active: true });
      mockRepository.findOne.mockResolvedValue(mockEntity);

      // 実行
      const result = await dao.fetchById(1);

      // 検証
      expect(result).toEqual(mockEntity);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    test('指定されたIDのアイコンカテゴリが存在しない場合はnullを返すこと', async () => {
      // 準備
      mockRepository.findOne.mockResolvedValue(null);

      // 実行
      const result = await dao.fetchById(999);

      // 検証
      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });
});
