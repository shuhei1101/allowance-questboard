import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { EntityManager, Repository } from 'typeorm';
import { BaseTranslationDao } from 'src/core/dao/baseTranslationDao';
import { BaseTranslationEntities } from 'src/core/entity/baseTranslationEntities';
import { TranslationEntityProtocol, BaseMasterTranslationEntity } from 'src/core/entity/baseTranslationEntity';
import { LanguageEntity } from 'src/features/language/entity/languageEntity';

// テスト用の具象エンティティクラス
class TestTranslationEntity extends BaseMasterTranslationEntity {
  constructor() {
    super();
  }

  test_source_id!: number;

  get sourceId(): number {
    return this.test_source_id;
  }

  static buildForTest(id: number, sourceId: number, languageId: number): TestTranslationEntity {
    const entity = new TestTranslationEntity();
    entity.id = id;
    entity.test_source_id = sourceId;
    entity.languageId = languageId;
    entity.language = new LanguageEntity();
    entity.language.id = languageId;
    return entity;
  }
}

// テスト用の具象DAOクラス
class TestTranslationDao extends BaseTranslationDao<TestTranslationEntity> {
  protected get entityClass(): new () => TestTranslationEntity {
    return TestTranslationEntity;
  }
}

describe('BaseTranslationDao', () => {
  let dao: TestTranslationDao;
  let mockSession: jest.Mocked<EntityManager>;
  let mockRepository: jest.Mocked<Repository<TestTranslationEntity>>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as any;

    mockSession = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as any;

    dao = new TestTranslationDao(mockSession);
  });

  describe('findAllTranslations', () => {
    test('全ての翻訳エンティティを取得してBaseTranslationEntitiesを返すこと', async () => {
      // 準備
      const mockEntities = [
        TestTranslationEntity.buildForTest(1, 100, 1),
        TestTranslationEntity.buildForTest(2, 100, 2),
        TestTranslationEntity.buildForTest(3, 200, 1),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.findAllTranslations();

      // 検証
      expect(result).toBeInstanceOf(BaseTranslationEntities);
      expect(result.count).toBe(3);
      expect(result.items).toEqual(mockEntities);
    });

    test('翻訳エンティティが存在しない場合は空のBaseTranslationEntitiesを返すこと', async () => {
      // 準備
      mockRepository.find.mockResolvedValue([]);

      // 実行
      const result = await dao.findAllTranslations();

      // 検証
      expect(result).toBeInstanceOf(BaseTranslationEntities);
      expect(result.count).toBe(0);
      expect(result.isEmpty).toBe(true);
    });
  });

  describe('findBySourceId', () => {
    test('指定されたsource_idの翻訳エンティティを取得してBaseTranslationEntitiesを返すこと', async () => {
      // 準備
      const sourceId = 100;
      const mockEntities = [
        TestTranslationEntity.buildForTest(1, sourceId, 1),
        TestTranslationEntity.buildForTest(2, sourceId, 2),
      ];
      mockRepository.find.mockResolvedValue(mockEntities);

      // 実行
      const result = await dao.findBySourceId(sourceId);

      // 検証
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { sourceId: sourceId }
      });
      expect(result).toBeInstanceOf(BaseTranslationEntities);
      expect(result.count).toBe(2);
      expect(result.items).toEqual(mockEntities);
    });

    test('指定されたsource_idの翻訳エンティティが存在しない場合は空のBaseTranslationEntitiesを返すこと', async () => {
      // 準備
      const sourceId = 999;
      mockRepository.find.mockResolvedValue([]);

      // 実行
      const result = await dao.findBySourceId(sourceId);

      // 検証
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { sourceId: sourceId }
      });
      expect(result).toBeInstanceOf(BaseTranslationEntities);
      expect(result.count).toBe(0);
      expect(result.isEmpty).toBe(true);
    });
  });
});
