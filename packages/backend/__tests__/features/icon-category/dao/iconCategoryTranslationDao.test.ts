import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EntityManager, Repository } from 'typeorm';
import { IconCategoryTranslationDao } from 'src/features/icon-category/dao/iconCategoryTranslationDao';
import { IconCategoryTranslationEntity, IconCategoryTranslationEntities } from 'src/features/icon-category/entity/iconCategoryEntity';
import { LanguageEntity } from 'src/features/language/entity/languageEntity';

describe('IconCategoryTranslationDao', () => {
  let dao: IconCategoryTranslationDao;
  let mockSession: jest.Mocked<EntityManager>;
  let mockRepository: jest.Mocked<Repository<IconCategoryTranslationEntity>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
    } as any;

    mockSession = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as any;

    dao = new IconCategoryTranslationDao(mockSession);
  });

  describe('findAllTranslationsWithCache', () => {
    test('全ての翻訳エンティティを取得してIconCategoryTranslationEntitiesを返すこと', async () => {
      // 準備
      const mockEntities = [
        Object.assign(new IconCategoryTranslationEntity(), { 
          id: 1, 
          category_id: 1, 
          language_id: 1, 
          name: "アクション",
          language: Object.assign(new LanguageEntity(), { id: 1 })
        }),
        Object.assign(new IconCategoryTranslationEntity(), { 
          id: 2, 
          category_id: 1, 
          language_id: 2, 
          name: "Action",
          language: Object.assign(new LanguageEntity(), { id: 2 })
        }),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.findAllTranslationsWithCache();

      // 検証
      expect(result).toBeInstanceOf(IconCategoryTranslationEntities);
      expect(result.count).toBe(2);
      expect(result.items).toEqual(mockEntities);
    });

    test('翻訳エンティティが存在しない場合は空のIconCategoryTranslationEntitiesを返すこと', async () => {
      // 準備
      mockRepository.find.mockResolvedValue([]);

      // 実行
      const result = await dao.findAllTranslationsWithCache();

      // 検証
      expect(result).toBeInstanceOf(IconCategoryTranslationEntities);
      expect(result.count).toBe(0);
      expect(result.isEmpty).toBe(true);
    });
  });

  describe('findBySourceIdWithCache', () => {
    test('指定されたsource_idの翻訳エンティティを取得してIconCategoryTranslationEntitiesを返すこと', async () => {
      // 準備
      const sourceId = 1;
      const mockEntities = [
        Object.assign(new IconCategoryTranslationEntity(), { 
          id: 1, 
          category_id: sourceId, 
          language_id: 1, 
          name: "アクション",
          language: Object.assign(new LanguageEntity(), { id: 1 })
        }),
        Object.assign(new IconCategoryTranslationEntity(), { 
          id: 2, 
          category_id: sourceId, 
          language_id: 2, 
          name: "Action",
          language: Object.assign(new LanguageEntity(), { id: 2 })
        }),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.findBySourceIdWithCache(sourceId);

      // 検証
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { sourceId: sourceId }
      });
      expect(result).toBeInstanceOf(IconCategoryTranslationEntities);
      expect(result.count).toBe(2);
      expect(result.items).toEqual(mockEntities);
    });

    test('指定されたsource_idの翻訳エンティティが存在しない場合は空のIconCategoryTranslationEntitiesを返すこと', async () => {
      // 準備
      const sourceId = 999;
      mockRepository.find.mockResolvedValue([]);

      // 実行
      const result = await dao.findBySourceIdWithCache(sourceId);

      // 検証
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { sourceId: sourceId }
      });
      expect(result).toBeInstanceOf(IconCategoryTranslationEntities);
      expect(result.count).toBe(0);
      expect(result.isEmpty).toBe(true);
    });
  });
});
